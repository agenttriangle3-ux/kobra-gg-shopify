# SETUP-GUIDE.md — Guida all'Installazione Kobra.GG su Shopify

## Prerequisiti
- Account email attivo
- Carta di credito o PayPal per Shopify (piano base ~€29/mese)

---

## PASSO 1 — Crea il tuo account Shopify

1. Vai su **https://www.shopify.com/it** e clicca "Inizia la prova gratuita"
2. Inserisci il tuo indirizzo email e segui la procedura guidata
3. Scegli il nome del negozio: **kobra-gg** (o variante disponibile)
4. Seleziona "Abbigliamento e accessori" o "Elettronica" come categoria
5. Completa la configurazione di base del negozio

---

## PASSO 2 — Carica il Tema Kobra.GG

1. Nel pannello Shopify, vai a **Negozio online → Temi**
2. Clicca **"Aggiungi tema"** → **"Carica file zip"**
3. Seleziona il file: `kobra-gg-shopify-theme.zip`
4. Attendi il caricamento (può richiedere 1–2 minuti)
5. Una volta caricato, clicca **"Pubblica"** per attivarlo

---

## PASSO 3 — Personalizza il Tema

1. Vai a **Negozio online → Temi → Personalizza**
2. Nella sezione **"Impostazioni del tema"** (icona ingranaggio in basso):
   - **Colori**: già preimpostati (verde #39FF14, nero #0a0a0a)
   - **Tipografia**: Bebas Neue per titoli, Inter per testo
   - **Contatti**: inserisci email e WhatsApp
   - **Social**: inserisci i link Instagram, TikTok, ecc.
3. Personalizza la homepage aggiungendo la tua collezione alla sezione **"Prodotti Consigliati"**

---

## PASSO 4 — Crea le Pagine di Contenuto

1. Vai a **Negozio online → Pagine → Aggiungi pagina**
2. Crea le seguenti pagine usando il contenuto dal file `PAGE-CONTENT.md`:
   - **Privacy Policy** (handle: `privacy`)
   - **Termini e Condizioni** (handle: `termini`)
   - **Politica di Reso** (handle: `reso`)
   - **Spedizioni** (handle: `spedizioni`)
   - **FAQ** (handle: `faq`)
   - **Chi Siamo** (handle: `chi-siamo`)
   - **Contatti** (handle: `contatti`) — usa il template "page.contact"
   - **Cookie Policy** (handle: `cookie`)
3. Per la pagina Contatti: nella sezione "Template", seleziona **"page.contact"**

---

## PASSO 5 — Crea le Collezioni Prodotti

1. Vai a **Prodotti → Collezioni → Crea collezione**
2. Crea queste collezioni (il nome deve corrispondere all'handle):
   - **Cuffie Gaming** (handle: `cuffie`)
   - **Mouse Gaming** (handle: `mouse`)
   - **Tastiere Gaming** (handle: `tastiere`)
   - **Controller** (handle: `controller`)
   - **Mousepad** (handle: `mousepad`)

---

## PASSO 6 — Installa l'App Dropshipping

Per importare prodotti dal dropshipping, installa una di queste app:

### Opzione A — DSers (consigliato, gratuito)
1. Vai su **App → Shopify App Store**
2. Cerca "DSers - AliExpress Dropshipping"
3. Installa e connetti il tuo account AliExpress
4. Importa i prodotti gaming desiderati

### Opzione B — Eprolo (dropshipping europeo)
1. Cerca "Eprolo" nell'App Store
2. Segui la procedura di configurazione

### Opzione C — Syncee (fornitori EU)
1. Cerca "Syncee" nell'App Store
2. Filtra per fornitori europei per spedizioni più veloci

---

## PASSO 7 — Configura i Pagamenti con Stripe

1. Vai a **Impostazioni → Pagamenti**
2. Sotto "Provider di pagamento esterni", seleziona **Stripe**
3. Segui la procedura di collegamento account Stripe
4. Alternativa: usa **Shopify Payments** (disponibile in Italia) per 0% commissioni aggiuntive

---

## PASSO 8 — Configura la Spedizione

1. Vai a **Impostazioni → Spedizione e consegna**
2. Aggiungi le zone di spedizione: Italia, EU
3. Imposta spedizione gratuita per ordini > €50
4. Imposta una tariffa fissa (es. €3,99) per ordini minori

---

## PASSO 9 — Configura il Dominio

### Usa il dominio Shopify gratuito (inizialmente):
Il tuo negozio sarà raggiungibile su `tuonome.myshopify.com`

### Collega un dominio personalizzato (kobra.gg o simile):
1. Vai a **Impostazioni → Domini**
2. Clicca "Connetti dominio esistente" se possiedi già kobra.gg
3. Oppure "Acquista nuovo dominio" se vuoi comprarne uno

---

## PASSO 10 — Impostazioni Legali

1. Vai a **Impostazioni → Informazioni legali**
2. Shopify può generare automaticamente Privacy Policy e T&C di base
3. Incollaci il contenuto di `PAGE-CONTENT.md` per versioni complete GDPR

---

## PASSO 11 — Trustpilot (quando pronto)

Quando avrai recensioni reali su Trustpilot:

1. Vai su **https://it.trustpilot.com** e crea un account aziendale
2. Verifica il tuo dominio
3. Copia il widget HTML dal tuo pannello Trustpilot
4. Nel tema, vai alla sezione **"Testimonianze"** e incolla il codice widget

---

## Checklist Pre-Lancio

- [ ] Tema caricato e pubblicato
- [ ] Tutte le pagine legali create
- [ ] Almeno 10 prodotti importati con immagini e descrizioni
- [ ] Collezioni create e associate ai prodotti
- [ ] Pagamenti configurati (Stripe o Shopify Payments)
- [ ] Email di conferma ordine personalizzata
- [ ] Test ordine di prova effettuato
- [ ] Dominio personalizzato collegato (opzionale)
- [ ] Link social media inseriti nel footer

---

## Supporto

Per assistenza sul tema: nedelcaflorin@gmail.com
WhatsApp: +39 379 153 6175

---

*Buona fortuna con Kobra.GG! 🎮*
