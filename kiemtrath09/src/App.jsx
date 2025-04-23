import './App.css';
import { useState } from 'react';

// Dữ liệu mẫu
const initialStudents = [
  { id: 1, name: "Nguyen Van A", class: "CNTT1", age: 20 },
  { id: 2, name: "Tran Thi B", class: "CNTT2", age: 21 },
  { id: 3, name: "Le Van C", class: "CNTT1", age: 19 },
];

function App() {
  const [students] = useState(initialStudents);
  console.log("Students data:", students); // Kiểm tra dữ liệu

  return (
    <div className="p-6" style={{ minHeight: "100vh" }}>
      <h1 className="text-2xl font-bold mb-6">Quản lý danh sách sinh viên</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full table-auto text-sm" style={{ borderCollapse: "collapse", display: "table" }}>
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="text-left px-4 py-3" style={{ border: "1px solid #ddd" }}>Tên</th>
              <th className="text-left px-4 py-3" style={{ border: "1px solid #ddd" }}>Lớp</th>
              <th className="text-left px-4 py-3" style={{ border: "1px solid #ddd" }}>Tuổi</th>
              <th className="text-left px-4 py-3" style={{ border: "1px solid #ddd" }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-t hover:bg-gray-50" style={{ border: "1px solid #ddd" }}>
                <td className="px-4 py-3" style={{ border: "1px solid #ddd" }}>{student.name}</td>
                <td className="px-4 py-3" style={{ border: "1px solid #ddd" }}>{student.class}</td>
                <td className="px-4 py-3" style={{ border: "1px solid #ddd" }}>{student.age}</td>
                <td className="px-4 py-3" style={{ border: "1px solid #ddd" }}>
                  <button className="text-red-600 hover:text-red-800">Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;