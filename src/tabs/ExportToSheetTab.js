// /* global chrome */
// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';

// function ExcelExportTab() {
//     const [file, setFile] = useState(null);

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         setFile(file);
//     };

//     const exportToExcel = async () => {
//         if (!file) {
//             alert('Please upload an Excel file.');
//             return;
//         }

//         // Read the Excel file
//         const data = await file.arrayBuffer();
//         const workbook = XLSX.read(data, { type: 'array' });

//         // Load categories from storage
//         const categories = await new Promise((resolve) => {
//             chrome.storage.local.get({ categories: [] }, (result) => {
//                 resolve(result.categories);
//             });
//         });

//         // Create a new worksheet from categories
//         const worksheet = XLSX.utils.json_to_sheet(categories.map(category => ({
//             Category: category.name,
//             'Amount Remaining': category.remaining
//         })), { header: ["Category", "Amount Remaining"] });

//         // Add the worksheet to the workbook under the name "Budget"
//         if (!workbook.SheetNames.includes("Budget")) {
//             workbook.SheetNames.push("Budget");
//         }
//         workbook.Sheets["Budget"] = worksheet;

//         // Write the workbook to a binary string
//         const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

//         // Convert binary string to Uint8Array
//         const buffer = new ArrayBuffer(wbout.length);
//         const view = new Uint8Array(buffer);
//         for (let i = 0; i < wbout.length; i++) {
//             view[i] = wbout.charCodeAt(i) & 0xFF;
//         }

//         // Create a Blob from the Uint8Array
//         const blob = new Blob([buffer], { type: 'application/octet-stream' });

//         // Create a URL and download the file
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'UpdatedBudget.xlsx';
//         document.body.appendChild(a);
//         a.click();
//         setTimeout(() => {
//             document.body.removeChild(a);
//             window.URL.revokeObjectURL(url);
//         }, 0);
//     };

//     return (
//         <div>
//             <h3>Export Budget to Excel</h3>
//             <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
//             <button onClick={exportToExcel}>Export to Excel</button>
//         </div>
//     );
// }

// export default ExcelExportTab;

/* global chrome */
import React, { useState } from 'react';
import * as XLSX from 'xlsx'; // npm install xlsx

function ExcelExportTab() {
    const [loading, setLoading] = useState(false);

    const exportToExcel = async () => {
        setLoading(true);

        // Load categories from storage
        const categories = await new Promise((resolve) => {
            chrome.storage.local.get({ categories: [] }, (result) => {
                resolve(result.categories);
            });
        });

        // Define worksheet data with headers
        const worksheetData = categories.map(category => ({
            Category: category.name,
            'Amount Remaining': category.remaining
        }));
        const worksheet = XLSX.utils.json_to_sheet(worksheetData, { header: ["Category", "Amount Remaining"] });

        // Create a new workbook and add the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Budget");

        // Write the workbook to a binary string
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

        // Convert binary string to Uint8Array
        const buffer = new ArrayBuffer(wbout.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < wbout.length; i++) {
            view[i] = wbout.charCodeAt(i) & 0xFF;
        }

        // Create a Blob from the Uint8Array
        const blob = new Blob([buffer], { type: 'application/octet-stream' });

        // Create a URL and download the file
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Budget.xlsx';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);

        setLoading(false);
    };

    return (
        <div>
            <h3>Export Budget to Excel</h3>
            <button onClick={exportToExcel} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Excel'}
            </button>
        </div>
    );
}

export default ExcelExportTab;
