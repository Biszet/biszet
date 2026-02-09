---
name: excel-writer
description: Read and write Excel spreadsheets (.xlsx, .xls) using Python's openpyxl library via uvx. Use this skill when users need to read data from Excel files, create new Excel files, modify existing files, or export data to Excel with formatting, formulas, charts, and multiple sheets.
---

# Excel Reader/Writer Skill

This skill enables GitHub Copilot to both read and write Excel files using Python's `openpyxl` library via `uvx`. It can parse existing Excel files, extract data, and create formatted spreadsheets with multiple sheets, formulas, styling, and charts.

## When to Use This Skill

Use this skill when:
- **Reading**: Extracting data from Excel files, parsing spreadsheets, analyzing Excel content
- **Writing**: Creating Excel files (.xlsx) from data structures (arrays, objects, JSON, etc.)
- **Converting**: Excel to JSON, Excel to CSV, or vice versa
- **Modifying**: Updating existing Excel files with new data or formatting
- **Reporting**: Generating formatted reports or data exports in Excel format
- **Analysis**: Processing Excel data for analysis or transformation

## Capabilities

### Reading
- ✅ Read data from Excel workbooks (.xlsx)
- ✅ Access multiple worksheets
- ✅ Extract cell values, formulas, and formatting
- ✅ Read specific ranges or entire sheets
- ✅ Handle merged cells and complex structures
- ✅ Export Excel data to JSON, CSV, or other formats

### Writing
- ✅ Create new Excel workbooks
- ✅ Add multiple worksheets
- ✅ Write data from arrays, objects, or structured data
- ✅ Apply cell formatting (fonts, colors, borders, alignment)
- ✅ Add formulas and calculations
- ✅ Create charts and graphs
- ✅ Set column Read Data from Excel File

When the user asks: "Read the data from this Excel file and show me the contents"

1. Generate a Python script using the read template below
2. Run it with: `uvx --with openpyxl python script.py`
3. The data will be displayed or exported as requested

### Example 2: Convert Excel to JSON

When the user asks: "Convert this Excel file to JSON format"

1. Use the reading template to parse the Excel file
2. Convert rows to dictionaries
3. Export as JSON file

### Example 3: Create a Simple Excel File

When the user asks: "Create an Excel file with sales data"

1. Generate a Python script using the write template below
2. Run it with: `uvx --with openpyxl python script.py`
3. The Excel file will be created in the specified location

### Example 4: Modify Existing Excel File

When the user asks: "Add s

### Reading Excel Files Template

Use this template for reading and extracting data from Excel files:

```python
#!/usr/bin/env python3
"""
Excel reading script using openpyxl
Run with: uvx --with openpyxl python <script_name>.py
"""

from openpyxl import load_workbook
from pathlib import Path
import json

def read_excel_file(filename: str):
    """Read data from an Excel file"""
    
    if not Path(filename).exists():
        print(f"❌ File not found: {filename}")
        return
    
    # Load the workbook
    wb = load_workbook(filename, data_only=True)  # data_only=True gets calculated values
    
    print(f"📊 Reading Excel file: {filename}")
    print(f"   Sheets: {wb.sheetnames}\n")
    
    # Read all sheets
    data = {}
    
    for sheet_name in wb.sheetnames:
        ws = wb[sheet_name]
        print(f"Sheet: {sheet_name}")
        print(f"  Dimensions: {ws.dimensions}")
        print(f"  Rows: {ws.max_row}, Columns: {ws.max_column}\n")
        
        # Read all rows
        sheet_data = []
        for row in ws.iter_rows(values_only=True):
            sheet_data.append(row)
        
        data[sheet_name] = sheet_data
        
        # Display first few rows
        print(f"  First {min(5, len(sheet_data))} rows:")
        for i, row in enumerate(sheet_data[:5], 1):
            print(f"    Row {i}: {row}")
        print()
    
    return data

def read_excel_to_dict(filename: str, sheet_name: str = None):
    """Read Excel file and convert to list of dictionaries (using first row as keys)"""
    
    wb = load_workbook(filename, data_only=True)
    ws = wb.active if sheet_name is None else wb[sheet_name]
    
    # Get header row
    rows = list(ws.iter_rows(values_only=True))
    if not rows:
        return []
    
    headers = rows[0]
    data = []
    
    for row in rows[1:]:
        row_dict = {headers[i]: row[i] for i in range(len(headers)) if i < len(row)}
        data.append(row_dict)
    
    return data

def read_specific_range(filename: str, sheet_name: str, range_str: str):
    """Read a specific range from Excel (e.g., 'A1:C10')"""
    
    wb = load_workbook(filename, data_only=True)
    ws = wb[sheet_name]
    
    data = []
    for row in ws[range_str]:
        data.append([cell.value for cell in row])
    
    return data

def excel_to_json(filename: str, output_file: str = "output.json"):
    """Convert Excel file to JSON"""
    
    data = read_excel_to_dict(filename)
    
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=2, default=str)
    
    print(f"✓ Converted to JSON: {output_file}")
    print(f"  Records: {len(data)}")

if __name__ == "__main__":
    # Example usage
    read_excel_file("example.xlsx")
    
    # Or convert to JSON
    # excel_to_json("example.xlsx", "output.json")
```

### Writing Excel Files Templatea new sheet to this Excel file with summary data"

1. Load the existing workbook
2. Create new sheet and populate it
3. Save the modified workbooke template below
2. Run it with: `uvx --with openpyxl python script.py`
3. The Excel file will be created in the specified location

### Example 2: Multi-Sheet Workbook with Formatting

When the user asks: "Create an Excel file with multiple sheets for Q1 sales by region"

1. Use the multi-sheet template
2. Apply appropriate formatting (headers, currency, totals)
3. Include formulas for calculations

## Python Script Template

Use this template as a starting point for generating Excel files:

```python
#!/usr/bin/env python3
### For Reading Excel Files:

1. **Understand the requirement**: Ask clarifying questions about:
   - Which Excel file to read
   - Specific sheets or ranges needed
   - Output format (display, JSON, CSV, etc.)
   - Any data transformations required

2. **Generate the Python script**: 
   - Use the reading template above
   - Customize for specific needs (full sheet, range, specific columns)
   - Include appropriate error handling

3. **Run the script**:
   - Use `uvx --with openpyxl python <script_name>.py`
   - Display or save the extracted data

### For Writing Excel Files:

1. **Understand the data structure**: Ask clarifying questions about:
   - Data source (hardcoded, from file, from API, etc.)
   - Number of sheets needed
   - Required formatting and styling
   - Any formulas or calculations
   - Output filename and location

2. **Generate the Python script**: 
   - Start with the writingle(filename: str):
    """Create an Excel file with formatted data"""
    
    # Create a new workbook
    wb = Workbook()
    ws = wb.active
    ws.title = "Sheet1"
    
    # Example: Add headers
    headers = ["ID", "Name", "Value", "Date"]
    ws.append(headers)
    
    # Style headers
    header_fill = PatternFill(start_color="4472C4", end_color="4472C4", fill_type="solid")
    header_font = Font(bold=True, color="FFFFFF")
    
    for cell in ws[1]:
        cell.fill = header_fill
        cell.font = header_font
        cell.alignment = Alignment(horizontal="center", vertical="center")
    
    # Example: Add data rows
    data = [
        [1, "Item A", 100.50, datetime.now()],
        [2, "Item B", 250.75, datetime.now()],
        [3, "Item C", 175.25, datetime.now()],
    ]
    
    for row in data:
        ws.append(row)
    
    # Format columns
    ws.column_dimensions['A'].width = 10
    ws.column_dimensions['B'].width = 20
    ws.column_dimensions['C'].width = 15
    ws.column_dimensions['D'].width = 20
    
    # Apply number formatting
    for row in range(2, ws.max_row + 1):
        ws[f'C{row}'].number_format = '$#,##0.00'
        ws[f'D{row}'].number_format = 'YYYY-MM-DD HH:MM:SS'
    
    # Add a total formula
    total_row = ws.max_row + 1
    ws[f'B{total_row}'] = "TOTAL"
    ws[f'B{total_row}'].font = Font(bold=True)
    ws[f'C{total_row}'] = f'=SUM(C2:C{ws.max_row})'
    ws[f'C{total_row}'].font = Font(bold=True)
    ws[f'C{total_row}'].number_format = '$#,##0.00'
    
    # Save the workbook
    wb.save(filename)
    print(f"✓ Excel file created: {filename}")

if __name__ == "__main__":
    create_excel_file("output.xlsx")
```

## Advanced Excel and converting to DataFrame-like structure:

```python
from openpyxl import load_workbook

wb = load_workbook('data.xlsx')
ws = wb.active

# Get headers
headers = [cell.value for cell in ws[1]]

# Get all data as list of dicts
data = []
for row in ws.iter_rows(min_row=2, values_only=True):
    data.append(dict(zip(headers, row)))
```

### Reading specific columns from Excel:

```python
# Read only columns B and D
data = []
for row in ws.iter_rows(min_row=2, values_only=True):
    data.append({'name': row[1], 'value': row[3]})  # B=1, D=3 (0-indexed)
```

### Reading Excel with formula results:
### Reading Scenarios
1. **Data Import**: Read Excel file and import into database or application
2. **Excel to JSON**: Convert Excel spreadsheets to JSON for APIs
3. **Data Validation**: Parse Excel file and validate data quality
4. **Report Analysis**: Extract and analyze data from Excel reports
5. **Excel to CSV**: Convert Excel files to CSV format

### Writing Scenarios
1. **Financial Report**: Multi-sheet workbook with income statement, balance sheet, and summary
2. **Data Export**: Convert application data to formatted Excel for stakeholders
3. **Template Generation**: Create template Excel files with predefined structure
4. **Automated Reporting**: Generate weekly/monthly reports with charts and summaries
5. **Data Analysis**: Export analysis results with visualizations

### Combined Scenarios
1. **Data Transformation**: Read Excel, transform data, write to new Excel
2. **Report Enhancement**: Read existing report, add new sheets/charts, save
3. **Data Merging**: Read multiple Excel files and combine into one
4. **Format Conversion**: Read old Excel format, write to new format with improvement

for row in ws.iter_rows(values_only=True):
    print(row)  # Shows calculated values, not formulas
```

### Reading from JSON and writing to Excel:

```python
import json
from pathlib import Path

# Read JSON data
data = json.loads(Path("data.json").read_text())

# Write to Excel
for item in data:
    ws.append([item['field1'], item['field2'], item['field3']])
```

### Converting CSV to Excel with formatting:

```python
import csv

with open('input.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        ws.append(row)
```

### Modifying existing Excel file:

```python
from openpyxl import load_workbook

# Load existing file
wb = load_workbook('existing.xlsx')
ws = wb.active

# Add new data
ws.append(['New', 'Data', 'Row'])

# Save back to same file or new file
wb.save('existing.xlsx')  # Overwrites
# wb.save('modified.xlsx')  # Creates new file

### Multiple Sheets

```python
# Add additional sheets
ws2 = wb.create_sheet("Summary")
ws3 = wb.create_sheet("Details")

# Reference data from other sheets
ws2['A1'] = "=Sheet1!C10"  # Reference cell from Sheet1
```

### Conditional Formatting

```python
from openpyxl.formatting.rule import ColorScaleRule

# Add color scale
ws.conditional_formatting.add(
    'C2:C10',
    ColorScaleRule(
        start_type='min', start_color='63BE7B',
        mid_type='percentile', mid_value=50, mid_color='FFEB84',
        end_type='max', end_color='F8696B'
    )
)
```

## Step-by-Step Workflow

When a user requests Excel file generation:

1. **Understand the data structure**: Ask clarifying questions about:
   - Data source (hardcoded, from file, from API, etc.)
   - Number of sheets needed
   - Required formatting and styling
   - Any formulas or calculations
   - Output filename and location

2. **Generate the Python script**: 
   - Start with the template above
   - Customize for the specific data and requirements
   - Include appropriate error handling

3. **Save the script**: 
   - Create a `.py` file in an appropriate location
   - Make it executable if needed

4. **Run the script**:
   - Use `uvx --with openpyxl python <script_name>.py`
   - Optionally add `--with xlsxwriter` if using xlsxwriter instead

5. **Verify output**:
   - Confirm the Excel file was created
   - Suggest opening it to verify the results

## Additional Libraries

While `openpyxl` is the primary library, you can also use:

- **xlsxwriter**: For write-only Excel files (faster for large datasets)
  ```bash
  uvx --with xlsxwriter python script.py
  ```

- **pandas**: For data manipulation before Excel export
  ```bash
  uvx --with pandas --with openpyxl python script.py
  ```

## Error Handling Template

Include error handling in generated scripts:

```python
import sys
from pathlib import Path

try:
    # Your Excel generation code here
    create_excel_file("output.xlsx")
except Exception as e:
    print(f"❌ Error creating Excel file: {e}", file=sys.stderr)
    sys.exit(1)
```

## Best Practices

1. **Validate input data** before writing to Excel
2. **Use descriptive sheet names** (max 31 characters, no special chars: `\ / * ? : [ ]`)
3. **Set appropriate column widths** for readability
4. **Add headers** and format them distinctly
5. **Include data validation** when appropriate
6. **Use named ranges** for complex formulas
7. **Test with sample data** before running on production data
8. **Handle file permissions** (check if file is already open)

## Common Patterns

### Reading from JSON and writing to Excel:

```python
import json
from pathlib import Path

# Read JSON data
data = json.loads(Path("data.json").read_text())

# Write to Excel
for item in data:
    ws.append([item['field1'], item['field2'], item['field3']])
```

### Converting CSV to Excel with formatting:

```python
import csv

with open('input.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        ws.append(row)
```

## Example Scenarios

1. **Financial Report**: Multi-sheet workbook with income statement, balance sheet, and summary
2. **Data Export**: Convert application data to formatted Excel for stakeholders
3. **Template Generation**: Create template Excel files with predefined structure
4. **Automated Reporting**: Generate weekly/monthly reports with charts and summaries
5. **Data Analysis**: Export analysis results with visualizations

## Resources

- [openpyxl documentation](https://openpyxl.readthedocs.io/)
- [xlsxwriter documentation](https://xlsxwriter.readthedocs.io/)
- [uvx documentation](https://github.com/astral-sh/uv)

## Notes

- Excel files are limited to 1,048,576 rows and 16,384 columns
- For very large datasets, consider splitting into multiple sheets or files
- uvx automatically downloads and caches Python packages on first use
- No local Python installation or virtual environment required
