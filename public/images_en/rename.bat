@echo off
echo Starte Umbenennung fuer englische Version...

REM --- ROOT DATEIEN ---
ren "biszet-logo-kosmetik-kuehlschrank.svg" "biszet-logo-cosmetics-fridge.svg"
ren "biszet-logo-weiss-made-in-germany.svg" "biszet-logo-white-made-in-germany.svg"
ren "biszet-beauty-kuehlschrank-poster.jpg" "biszet-beauty-fridge-poster.jpg"
ren "biszet-beauty-kuehlschrank-animation-poster.jpg" "biszet-beauty-fridge-animation-poster.jpg"
ren "biszet-kosmetik-kuehlschrank-klimazonen.svg" "biszet-cosmetics-fridge-climate-zones.svg"
ren "biszet-b7-technische-zeichnung-abmessungen-masse.svg" "biszet-b7-technical-drawing-dimensions.svg"
ren "biszet-b7-kosmetikkuehlschrank-elegantes-design-made-in-germany.jpg" "biszet-b7-cosmetics-fridge-elegant-design-made-in-germany.jpg"
ren "biszet-b7-kosmetikkuehlschrank-elegantes-design-made-in-germany-mobile.jpg" "biszet-b7-cosmetics-fridge-elegant-design-made-in-germany-mobile.jpg"
ren "biszet-b7-frontansicht-edelstahl-tuergriff.jpg" "biszet-b7-front-view-stainless-steel-door-handle.jpg"
ren "biszet-b7-innenraum-led-beleuchtung-glasboeden.jpg" "biszet-b7-interior-led-lighting-glass-shelves.jpg"
ren "biszet-b7-kosmetik-kuehlschrank-diagonal-ansicht.jpg" "biszet-b7-cosmetics-fridge-diagonal-view.jpg"
ren "biszet-b7-park-hyatt.jpg" "biszet-b7-at-park-hyatt.jpg"
ren "biszet-manufaktur-handarbeit-wildleder-dichtung.jpg" "biszet-manufactory-handcraft-suede-seal.jpg"
ren "biszet-manufaktur-showroom-koeln-beratung.jpg" "biszet-manufactory-showroom-cologne-consultation.jpg"
ren "juergen-kraus-geschaeftsfuehrer-biszet-gmbh.jpg" "juergen-kraus-ceo-biszet-gmbh.jpg"
ren "ulla-kraus-geschaeftsfuehrerin-technik-entwicklung.jpg" "ulla-kraus-ceo-technology-development.jpg"
ren "schrank-offen.jpg" "cabinet-open.jpg"
ren "schrank-geschlossen.jpg" "cabinet-closed.jpg"
ren "schrank-diagonal.jpg" "cabinet-diagonal.jpg"

REM --- UNTERORDNER: LOGOS ---
cd logos
ren "biszet-presse-wallpaper-design-magazine.svg" "biszet-press-wallpaper-design-magazine.svg"
ren "biszet-presse-ad-architectural-digest.svg" "biszet-press-ad-architectural-digest.svg"
ren "biszet-presse-vogue-magazin.svg" "biszet-press-vogue-magazine.svg"
ren "biszet-presse-house-and-garden.svg" "biszet-press-house-and-garden.svg"
ren "biszet-presse-bild-zeitung.svg" "biszet-press-bild-newspaper.svg"
ren "biszet-presse-elle-decoration.svg" "biszet-press-elle-decoration.svg"
ren "biszet-presse-myself-magazin.svg" "biszet-press-myself-magazine.svg"
ren "biszet-presse-elle-italia.svg" "biszet-press-elle-italia.svg"
ren "referenz-cheval-blanc-hotel-paris-lvmh.svg" "reference-cheval-blanc-hotel-paris-lvmh.svg"
ren "referenz-dior-flagshipstore-paris.svg" "reference-dior-flagshipstore-paris.svg"
ren "referenz-the-shard-london-luxury-apartments.svg" "reference-the-shard-london-luxury-apartments.svg"
ren "referenz-jumeirah-emirates-towers-dubai.svg" "reference-jumeirah-emirates-towers-dubai.svg"
ren "referenz-ritz-carlton-berlin-potsdamer-platz.svg" "reference-ritz-carlton-berlin-potsdamer-platz.svg"
ren "referenz-park-hyatt-istanbul.svg" "reference-park-hyatt-istanbul.svg"
ren "referenz-sylter-faehrhaus-wellness-hotel.png" "reference-sylter-faehrhaus-wellness-hotel.png"
ren "referenz-hotel-budersand-sylt.png" "reference-hotel-budersand-sylt.png"
ren "referenz-bsc-group-hong-kong-interiors.png" "reference-bsc-group-hong-kong-interiors.png"
cd ..

REM --- UNTERORDNER: PRODUKTBILDER ---
ren "produktbilder" "product-images"
cd product-images
ren "B7-Kosmetikkühlschrank-Szene.jpg" "B7-Cosmetics-Fridge-Scene.jpg"
ren "B7-Kosmetikkühlschrank-Szene-Mobil.jpg" "B7-Cosmetics-Fridge-Scene-Mobile.jpg"
cd ..

echo Fertig! Alle Bilder wurden umbenannt.
pause