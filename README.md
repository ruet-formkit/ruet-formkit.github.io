<div align="center">

<img src="c-logo.png" alt="RUET Logo" width="80" />

# RUET FormKit

**Academic tools built exclusively for RUET students.**
Generate official forms, calculate your CGPA, and manage academic paperwork — fast and free.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![No Login](https://img.shields.io/badge/No%20Login-Required-green.svg)]()
[![100% Free](https://img.shields.io/badge/100%25-Free-brightgreen.svg)]()
[![RUET](https://img.shields.io/badge/Built%20for-RUET-red.svg)]()

[**→ Open FormKit**](https://anantoislamsiyam.github.io/ruet-formkit/) &nbsp;·&nbsp; [Course Registration](https://anantoislamsiyam.github.io/ruet-formkit/course-registration.html) &nbsp;·&nbsp; [Exam Application](https://anantoislamsiyam.github.io/ruet-formkit/form-fillup.html) &nbsp;·&nbsp; [CGPA Calculator](https://anantoislamsiyam.github.io/ruet-formkit/cgpa-calculator.html)

</div>

---

## Overview

RUET FormKit is a lightweight, browser-based portal that replaces the tedious pen-and-paper academic form workflow at Rajshahi University of Engineering & Technology. No installation, no account, no server — everything runs entirely in your browser.

**The problem it solves:** Every semester, RUET students manually fill identical course lists onto multiple official forms. FormKit automates that — select your department and semester, and your courses populate instantly.

---

## Tools

### 📋 Course Registration Form Generator

Generate your official RUET course registration form in seconds.

- Select department, roll, session, and semester
- Courses auto-fill with correct codes, titles, and credit hours
- Add backlog courses in a separate section
- Preview inline (desktop) or in a new tab (mobile/tablet)
- Export to a **print-ready PDF** in the correct RUET legal-size format

---

### 📝 Exam Application Form Generator

Fill your RUET exam application form digitally — no handwriting required.

- Bilingual layout **(Bangla + English)** matching the official form exactly
- Courses auto-load by department and semester
- All fields editable inline on the digital form preview
- Print directly — output is print-safe and dark-mode aware
- Semester selection popup with organized year/semester grouping

---

### 🖩 CGPA Calculator

Calculate SGPA and cumulative CGPA using RUET's official grading scale.

- **Two input modes:** percentage (marks) or letter grade
- Department-aware course loading with correct credit hours
- Two cumulative methods: by semester or overall CGPA
- Animated visual result with GPA arc display
- Built-in RUET grading scale reference table
- Supports adding multiple semesters for CGPA tracking

---

## Features

| Feature | Detail |
|---|---|
| ⚡ **Auto-fill** | Select dept + semester → courses populate automatically |
| 📄 **Official Format** | PDFs match the exact RUET legal-size form layout |
| 🌙 **Dark / Light Mode** | Manual toggle + respects system preference |
| 📱 **Fully Responsive** | Works on phones, tablets, and desktops |
| 🔒 **100% Private** | No data leaves your browser — ever |
| 🏫 **All Departments** | Full course database for every RUET department |
| ✈️ **Offline Ready** | Works without an internet connection after first load |
| 🖨️ **Print Safe** | Dark mode overrides correctly stripped for clean prints |

---

## File Structure

```
ruet-formkit/
│
├── index.html                  # Landing page
├── course-registration.html    # Course Registration Form Generator
├── form-fillup.html            # Exam Application Form Generator
├── cgpa-calculator.html        # CGPA Calculator
│
├── header.html                 # Shared header partial (injected via fetch)
├── footer.html                 # Shared footer partial (injected via fetch)
├── layout.js                   # Shared JS: header/footer injection, dark mode, active nav
├── layout.css                  # Shared CSS: header, footer, sidebar, theme variables
│
└── c-logo.png                  # RUET crest logo
```

### Architecture

Each page is a **self-contained HTML file** with its own scoped CSS and JS. Shared UI (header, footer, navigation, dark mode toggle) is managed by `layout.js` and `layout.css`, injected into every page via `fetch()`.

```
Page load
  └── layout.js runs
        ├── Fetches header.html → injects into #fk-header
        ├── Fetches footer.html → injects into #fk-footer
        ├── Reads localStorage for theme → applies data-theme attribute
        └── Marks active nav link via data-page attribute
```

**Dark mode** is toggled by setting `data-theme="dark"` on `<html>` and persisted to `localStorage` under the key `ruetFormkit_theme`. All pages respect this on load via an inline script in `<head>` to prevent flash.

---

## Usage

### Option 1 — Open directly in browser

Clone or download the repository, then open `index.html` in any modern browser.

```bash
git clone https://github.com/anantoislamsiyam/ruet-formkit.git
cd ruet-formkit
# Open index.html in your browser
```

> **Note:** The shared header and footer are loaded via `fetch()`. For this to work when opening locally, use a local server (see below) or a browser that allows local file fetching (some do by default).

### Option 2 — Local development server

```bash
# Using Python (built-in)
python -m http.server 8080

# Using Node.js (npx)
npx serve .

# Using VS Code
# Install the "Live Server" extension, then right-click index.html → Open with Live Server
```

Then visit `http://localhost:8080`.

---

## Browser Support

| Browser | Status |
|---|---|
| Chrome / Edge 90+ | ✅ Full support |
| Firefox 88+ | ✅ Full support |
| Safari 14+ | ✅ Full support |
| Mobile Chrome / Safari | ✅ Full support |
| Internet Explorer | ❌ Not supported |

---

## Contributing

Contributions are welcome — especially additions to the course database or support for new departments/semesters.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -m "Add: description of change"`
5. Push: `git push origin feature/your-feature`
6. Open a Pull Request

### Adding courses

Course data is defined as JavaScript arrays inside each tool's HTML file. Each entry follows this structure:

```js
{
  code: "ME 2101",
  title: "Engineering Mechanics",
  credit: 3.0
}
```

Locate the `COURSES` or `courseData` object for your department and semester, add the entry, and submit a PR.

---

## License

This project is released under the [MIT License](LICENSE). Free to use, modify, and distribute — attribution appreciated.

---

<div align="center">

Built for RUET students &nbsp;·&nbsp; Rajshahi University of Engineering & Technology

</div>
