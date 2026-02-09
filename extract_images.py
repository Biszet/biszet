#!/usr/bin/env python3
import json
import csv

# Read dictionaries
with open('src/dictionaries/de.json', 'r', encoding='utf-8') as f:
    de = json.load(f)

# Extract all images with their alt texts and paths
images = []

def extract_images(obj, path="", page=""):
    if isinstance(obj, dict):
        # Check for image properties
        if 'imageAlt' in obj or 'alt' in obj:
            img_data = {
                'page': page,
                'path': path,
                'imageSrc': obj.get('imageSrc', obj.get('src', '')),
                'imageSrcMobile': obj.get('imageSrcMobile', ''),
                'imageAlt': obj.get('imageAlt', obj.get('alt', '')),
            }
            images.append(img_data)
        
        # Recurse
        for key, value in obj.items():
            new_path = f"{path}.{key}" if path else key
            extract_images(value, new_path, page or key)
    elif isinstance(obj, list):
        for idx, item in enumerate(obj):
            extract_images(item, f"{path}[{idx}]", page)

# Extract from all pages
for page_key in de.keys():
    extract_images(de[page_key], page=page_key)

# Sort by page and path
images.sort(key=lambda x: (x['page'], x['path']))

# Write to CSV
with open('docs/bilder-urls-aktuell.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['Seite', 'Pfad im Dictionary', 'Bild-URL', 'Mobile URL', 'Aktueller Alt-Text DE'])
    
    for img in images:
        mobile = img['imageSrcMobile'] if img['imageSrcMobile'] else '-'
        writer.writerow([
            img['page'],
            img['path'],
            img['imageSrc'],
            mobile,
            img['imageAlt']
        ])

print(f"✅ {len(images)} Bilder extrahiert → docs/bilder-urls-aktuell.csv")
