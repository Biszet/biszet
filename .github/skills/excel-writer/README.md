# Excel Reader/Writer Skill

A GitHub Copilot Agent Skill for reading and writing Excel spreadsheets using Python's openpyxl library via uvx.

## Quick Start

This skill enables Copilot to generate Python scripts that both read from and write to Excel files. Simply ask Copilot to read, create, modify, or convert Excel files.

### Example Prompts

**Reading:**
- "Read the data from this Excel file and show me the contents"
- "Convert this Excel file to JSON format"
- "Extract the Summary sheet from this workbook"
- "Parse this Excel file and show me the first 10 rows"

**Writing:**
- "Create an Excel four example scripts you can run directly:

### 1. Basic Writing Example
```bash
uvx --with openpyxl python .github/skills/excel-writer/example-basic.py
```

Creates a simple sales report with:
- Formatted headers
- Currency formatting
- Automatic totals with formulas

### 2. Advanced Writing Example
```bash
uvx --with openpyxl python .github/skills/excel-writer/example-advanced.py
```

Creates a quarterly report with:
- Multiple sheets (Summary, Monthly Details, Products)
- Bar chart for monthly profit
- Pie chart for product revenue
- Complex formulas and formatting

### 3. Reading Example
```bash
uvx --with openpyxl python .github/skills/excel-writer/example-read.py
```

Reads the quarterly report and:
- Displays all sheet contents
- Converts data to JSON
- Reads specific cell ranges
- Shows data structure

### 4. Modification Example
```bash
uvx --with openpyxl python .gwhat you need (read, write, or modify Excel)
2. **Script Generation**: Copilot generates a Python script using openpyxl
3. **Run with uvx**: Execute with `uvx --with openpyxl python script.py`
4. **Get Results**: Excel file is created/modified, or data is extracted

## Features

### Reading
- ✅ Read data from Excel workbooks (.xlsx, .xls)
- ✅ Access multiple worksheets
- ✅ Extract specific cell ranges
- ✅ Convert Excel to JSON/CSV
- ✅ Handle formulas and formatting
- ✅ Parse large datasets efficiently

### Writing
- ✅ No Python installation required (uses uvx)
- ✅ No manual dependency management
- ✅ Create formatted spreadsheets
- ✅ Multiple sheets support
- ✅ Charts and graphs
- ✅ Formulas and calculations
- ✅ Cell styling and formatting
- ✅ Data validation

### Modifying
- ✅ Load and update existing files
- ✅ Add new sheets to workbooks
- ✅ Create cross-sheet formulaswriting example
├── example-advanced.py   # Complex writing example with charts
├── example-read.py       # Reading and parsing example
└── example-modify.py     # Modifying existing files example
- Multiple sheets (Summary, Monthly Details, Products)
- Bar chart for monthly profit
- Pie chart for product revenue
- Complex formulas and formatting
### Reading
1. **Data Import**: Read Excel files into applications/databases
2. **Excel to JSON/CSV**: Convert Excel data to other formats
3. **Data Analysis**: Parse and analyze Excel reports
4. **Validation**: Check Excel data quality and structure
5. **Integration**: Extract data for APIs or other systems
### For Reading
- Specify which sheets or ranges you need
- Mention desired output format (display, JSON, CSV)
- Indicate if you need formulas or calculated values
- Be clear about data structure expectations

### For Writing
- Be specific about your data structure and formatting needs
- Mention if you need multiple sheets
- Specify if you want charts or special formatting
- Indicate the output filename and location

### For Modifying
- Specify which existing file to modify
- Describe what changes or additions are needed
- Indicate whether to save as new file or overwritewith calculations
3. **Templates**: Create template files with predefined structure
4. **Data Conversion**: Convert CSV/JSON to formatted Excel
5. **Analytics**: Create reports with charts and visualizations

### Modifying
1. **Enhancement**: Add analysis sheets to existing reports
2. **Updates**: Refresh data in existing workbooks
3. **Consolidation**: Merge multiple Excel files
4. **Transformation**: Restructure existing Excel fileing openpyxl
3. **Run with uvx**: Execute with `uvx --with openpyxl python script.py`
4. **Get Your File**: Excel file is created instantly

## Features

- ✅ No Python installation required (uses uvx)
- ✅ No manual dependency management
- ✅ Create formatted spreadsheets
- ✅ Multiple sheets support
- ✅ Charts and graphs
- ✅ Formulas and calculations
- ✅ Cell styling and formatting
- ✅ Data validation

## Requirements

- [uvx](https://github.com/astral-sh/uv) installed on your system
- VS Code with GitHub Copilot
- Agent Skills enabled: `"chat.useAgentSkills": true` in settings

## File Structure

```
.github/skills/excel-writer/
├── SKILL.md              # Main skill definition (loaded by Copilot)
├── README.md             # This file (documentation)
├── example-basic.py      # Simple example script
└── example-advanced.py   # Complex example with charts
```

## Common Use Cases

1. **Data Export**: Export application data to Excel
2. **Reports**: Generate formatted reports with calculations
3. **Templates**: Create template files with predefined structure
4. **Data Conversion**: Convert CSV/JSON to formatted Excel
5. **Analytics**: Create reports with charts and visualizations

## Tips

- Be specific about your data structure and formatting needs
- Mention if you need multiple sheets
- Specify if you want charts or special formatting
- Indicate the output filename and location

## Resources

- [openpyxl Documentation](https://openpyxl.readthedocs.io/)
- [uvx Documentation](https://github.com/astral-sh/uv)
- [Agent Skills Standard](https://agentskills.io/)
