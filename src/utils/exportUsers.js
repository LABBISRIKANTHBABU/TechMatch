/**
 * exportUsers.js
 * Client-side utility to export user data to Excel
 * 
 * Requires: npm install exceljs file-saver
 * 
 * Usage:
 * import { exportUsersToExcel } from '../utils/exportUsers';
 * 
 * <button onClick={exportUsersToExcel}>Export Users to Excel</button>
 */

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Export all users to Excel file
 * Only admin users should have access to this function
 */
export async function exportUsersToExcel() {
  try {
    // Dynamic import to avoid loading exceljs if not needed
    const ExcelJS = (await import('exceljs')).default;
    const { saveAs } = await import('file-saver');

    // Fetch all users from Firestore
    const snapshot = await getDocs(collection(db, 'users'));
    
    // Create new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Users');

    // Define columns
    sheet.columns = [
      { header: 'UID', key: 'uid', width: 28 },
      { header: 'Email', key: 'email', width: 32 },
      { header: 'Name', key: 'displayName', width: 22 },
      { header: 'Phone', key: 'phoneNumber', width: 16 },
      { header: 'Role', key: 'role', width: 12 },
      { header: 'TOS Accepted', key: 'acceptedTOS', width: 14 },
      { header: 'Created At', key: 'createdAt', width: 24 },
      { header: 'Last Seen', key: 'lastSeen', width: 24 },
    ];

    // Style header row
    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };

    // Add data rows
    snapshot.forEach((doc) => {
      const data = doc.data();
      sheet.addRow({
        uid: doc.id,
        email: data.email || '',
        displayName: data.displayName || '',
        phoneNumber: data.phoneNumber || '',
        role: data.role || 'student',
        acceptedTOS: data.acceptedTOS ? 'Yes' : 'No',
        createdAt: data.createdAt || '',
        lastSeen: data.lastSeen || '',
      });
    });

    // Generate and download file
    const buf = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `techmatch-users-${new Date().toISOString().split('T')[0]}.xlsx`);

    console.log(`Exported ${snapshot.size} users to Excel`);
    return { success: true, count: snapshot.size };
  } catch (error) {
    console.error('Failed to export users to Excel:', error);
    throw error;
  }
}

/**
 * Export students only (role = 'student')
 */
export async function exportStudentsToExcel() {
  try {
    const ExcelJS = (await import('exceljs')).default;
    const { saveAs } = await import('file-saver');

    // Query only students
    const q = query(collection(db, 'users'), where('role', '==', 'student'));
    const snapshot = await getDocs(q);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Students');

    sheet.columns = [
      { header: 'UID', key: 'uid', width: 28 },
      { header: 'Email', key: 'email', width: 32 },
      { header: 'Name', key: 'displayName', width: 22 },
      { header: 'Phone', key: 'phoneNumber', width: 16 },
      { header: 'Created At', key: 'createdAt', width: 24 },
    ];

    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };

    snapshot.forEach((doc) => {
      const data = doc.data();
      sheet.addRow({
        uid: doc.id,
        email: data.email || '',
        displayName: data.displayName || '',
        phoneNumber: data.phoneNumber || '',
        createdAt: data.createdAt || '',
      });
    });

    const buf = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `techmatch-students-${new Date().toISOString().split('T')[0]}.xlsx`);

    console.log(`Exported ${snapshot.size} students to Excel`);
    return { success: true, count: snapshot.size };
  } catch (error) {
    console.error('Failed to export students to Excel:', error);
    throw error;
  }
}

/**
 * Export users as CSV (simpler format, no dependencies)
 */
export async function exportUsersToCSV() {
  try {
    const { saveAs } = await import('file-saver');
    const snapshot = await getDocs(collection(db, 'users'));

    // Create CSV header
    const headers = ['UID', 'Email', 'Name', 'Phone', 'Role', 'TOS Accepted', 'Created At', 'Last Seen'];
    
    // Create CSV rows
    const rows = snapshot.docs.map((doc) => {
      const data = doc.data();
      return [
        doc.id,
        data.email || '',
        data.displayName || '',
        data.phoneNumber || '',
        data.role || 'student',
        data.acceptedTOS ? 'Yes' : 'No',
        data.createdAt || '',
        data.lastSeen || '',
      ];
    });

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`) // Escape quotes
          .join(',')
      ),
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `techmatch-users-${new Date().toISOString().split('T')[0]}.csv`);

    console.log(`Exported ${snapshot.size} users to CSV`);
    return { success: true, count: snapshot.size };
  } catch (error) {
    console.error('Failed to export users to CSV:', error);
    throw error;
  }
}
