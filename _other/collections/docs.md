# Collections (system addon)

Srce CMS-a. Korisnik pravi kolekcije u runtime-u (Blog, Authors, Products), definiše polja,
a sistem od te definicije pravi pravu tabelu u bazi i daje pun CRUD nad njom. Sve ide kroz
čiste generičke komande, pipeline i transakcije. Versioning, time-travel, multijezičnost,
restore i multi-tenant nasleđuju se iz framework database addona, ne pišu se ovde ponovo.

Radi na PostgreSQL, MySQL 8 i SQLite (sve kroz framework database, dokazano testovima).

## Glavna ideja

Postoje dva nivoa:

1. Kolekcija (definicija). Jedan red u tabeli `collections`: slug, ime, ikona, lista polja.
   To je samo opis sheme. Tim poseduje svoje kolekcije (team_id).
2. Item (podatak). Pravi red u tabeli `collection_<slug>` koja se napravi iz definicije.

Kad napraviš kolekciju, sistem napravi runtime addon (`onetype.Addon('collection:<slug>')`)
sa Table + Field + Versions + Translations, a database auto-sync od toga napravi (ili dopuni)
stvarnu tabelu. Skalarna polja postaju prave kolone (brz filter i sort), složena polja
(repeater, group, gallery, json) postaju JSON kolone. To je hibrid model, ne EAV, pa ostaje
brz i na milion redova.

Ime runtime addona nosi slug (`collection:blog`) jer versioning i prevodi keyuju redove po
imenu addona. Zato slug mora biti stabilan i nikad se ne menja ni reused (preimenovanje bi
otkačilo istoriju).

## Fajlovi

### Shared (koriste i front i back)

- `shared/system/collections/addon.js`
  Definicija tabele `collections` (katalog). Polja: id, team_id, slug, name, icon, kind
  (list / single / settings), fields (niz definicija polja), config, timestamps, deleted_at.
  Ima `Versions('*')` pa i same definicije imaju istoriju. Na dnu importuje schema.js.

- `shared/system/collections/schema.js`
  `DataSchema('collection')`, ista polja kao addon. Koristi se kao `out: 'collection'` u
  komandama, da izlaz bude tipizovan.

- `shared/system/collections/types.js`
  Registar tipova polja (`onetype.Addon('collections.types')`). 26 tipova: text, richtext,
  number, toggle, select, multiselect, date, email, phone, url, color, location, image,
  gallery, file, video, reference, multireference, user, repeater, group, keyvalue, json,
  price, sku, formula. Svaki tip ima `define` (framework field define u koji se prevodi, npr.
  text je ['string'], number je ['number', 0], repeater je ['array', []]). Back koristi
  `define` da napravi pravu kolonu, front koristi name/icon/group za paletu polja.

### Back core

- `core/materialize.js` -> `collections.Fn('materialize', definition)`
  Od definicije kolekcije pravi runtime addon: doda id, team_id, site_id, pa za svako polje
  doda Field sa define iz registra tipova, pa created_at/updated_at/deleted_at, pa
  Table('collection_<slug>'), Versions('*') i Translations za polja koja imaju translatable:true.
  Idempotentno (onetype.Addon reuse-uje po imenu), pa ponovni poziv samo osveži shemu.

- `core/addon.js` -> `collections.Fn('addon', slug, team_id, connection)`
  Učita definiciju iz kataloga za taj tim, materijalizuje je i vrati runtime addon (ili null
  ako ne postoji). Ovo koriste item komande i pipeline da dobiju addon nad kojim rade CRUD.

### Back pipelines (sve u transakciji preko database.Fn('transaction'))

Kolekcije (definicije):

- `core/pipelines/crud/create.js` -> `collections:create`
  validate (ime obavezno; slug mora /^[a-z][a-z0-9_]*$/; slug slobodan za tim) ->
  store (upiše definiciju u katalog) -> materialize (auto-sync napravi tabelu).

- `core/pipelines/crud/update.js` -> `collections:update`
  load -> store (promeni name/icon/kind/fields) -> materialize (re-sync, nova polja postaju
  kolone; auto-sync nikad ne dropuje, uklonjeno polje ostaje kao kolona).

- `core/pipelines/crud/delete.js` -> `collections:delete`
  load -> delete (soft-delete definicije). Tabela i podaci ostaju netaknuti, pa se kolekcija
  može vratiti.

Itemi (podaci):

- `core/pipelines/items/create.js` -> `collections:items:create`
  addon (resolve runtime addon po slug-u) -> create (napravi red sa prosleđenim data + team_id,
  versioned + i18n).

- `core/pipelines/items/update.js` -> `collections:items:update`
  addon -> load (item za taj tim) -> update.

- `core/pipelines/items/delete.js` -> `collections:items:delete`
  addon -> load -> delete (soft-delete itema, jer kolekcije su versioned).

### Back komande (HTTP API sloj, tanke, zovu pipeline ili Find)

Kolekcije:

- `collections:create`  POST   /api/collections
- `collections:update`  PATCH  /api/collections/:id
- `collections:delete`  DELETE /api/collections/:id
- `collections:list`    GET    /api/collections        (filteri, sort, paginacija)
- `collections:get`     GET    /api/collections/:slug

Itemi:

- `collections:items:create`  POST   /api/collections/:slug/items
- `collections:items:update`  PATCH  /api/collections/:slug/items/:id
- `collections:items:delete`  DELETE /api/collections/:slug/items/:id
- `collections:items:list`    GET    /api/collections/:slug/items   (filteri, sort, paginacija, jezik)
- `collections:items:get`     GET    /api/collections/:slug/items/:id

Sve komande traže ulogovanog korisnika (`this.http.state.user`), inače vraćaju 401. Tim se
uzima iz `this.http.state.user.team.id`, nikad se ne veruje klijentu. Jezik za item read/write
dolazi iz `this.http.state.language` / `languages`.

- `load.js`
  Uvozi shared addon + types, core (materialize, addon), sve pipeline-e, sve komande.

## Šta se nasleđuje iz database addona (ne piše se ovde)

- Versioning: svaki write upiše diff u `database_versions`. Time-travel kroz `addon.Find().version(N)`
  (JS fold, multi-db). Restore celog skupa na tačku kroz `addon.Restore(N)`.
- Multijezičnost: polja sa translatable:true idu u `database_translations` za ne-default jezik,
  čitaju se preko batched overlay-a sa fallback-om na default. Slug i name se mogu prevoditi, id ne.
- Auto-sync: kreiranje tabele i dodavanje kolona radi database na osnovu Field definicija.
  Nikad ne dropuje kolonu bez eksplicitnog prune flaga.
- Soft-delete: pošto kolekcije imaju Versions, Delete je soft (deleted_at), a live read sam
  skriva obrisane.

## Multi-tenant

Svaki red (i definicija i item) ima team_id. Sve komande filtriraju po timu iz state-a, pa
jedan tim nikad ne vidi ni dira tuđe kolekcije. Materialize addonu doda i site_id kolonu za
buduće skoupiranje po sajtu.

team_id i slug (u katalogu), kao i team_id i site_id (u materializovanim tabelama), su
indeksirani, jer svaki upit filtrira po njima. Index flag je peti pozicioni argument
addon.Field (Field(name, define, get, set, map)), ne ključ u define objektu. Ako se stavi
kao map:true unutar define objekta, framework ga tiho ignoriše i kolona ostane bez indeksa.

## Tipovi polja, ukratko

Skalar (kolona, indeksabilno): text, richtext (json), number, toggle, select, date, email,
phone, url, color, reference, user, price, sku.
Složeno (JSON kolona): multiselect, location, image, gallery, file, video, multireference,
repeater, group, keyvalue, json.
Formula: za sad kolona (['string']); materijalizacija izračunate vrednosti je naredni korak.

## Status i sledeći koraci

Urađeno i testirano na pg/sqlite/mysql (kroz prave komande + pipeline): kreiranje kolekcije i
materijalizacija tabele, dodavanje polja (nova kolona), CRUD itema, svi tipovi, multijezičnost
(field-level), versioning, time-travel, soft-delete, restore, multi-tenant izolacija, auth 401,
duplikat slug 409.

Nije još: validacija data protiv definicije kolekcije (nepostojeća/pogrešna polja u item create
treba da vrate 400), Expose za automatske database endpointe, formula koja računa vrednost,
relacije kao prošireni read (join drugih kolekcija), boot-materializacija svih kolekcija na startu,
front Collections app.
