import { useState } from 'react';

// Dữ liệu mẫu
const initialStudents = [
  { id: 1, name: "Nguyen Van A", class: "CNTT1", age: 20 },
  { id: 2, name: "Tran Thi B", class: "CNTT2", age: 21 },
  { id: 3, name: "Le Van C", class: "CNTT1", age: 19 },
];

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    age: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = () => {
    // Kiểm tra nếu các trường không rỗng
    if (!formData.name || !formData.class || !formData.age) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // Tạo sinh viên mới
    const newStudent = {
      id: students.length + 1,
      name: formData.name,
      class: formData.class,
      age: parseInt(formData.age),
    };

    // Thêm sinh viên mới vào danh sách
    setStudents([...students, newStudent]);

    // Hiển thị thông báo thành công
    setSuccessMessage("Thêm thành công!");
    console.log("Success message set:", "Thêm thành công!"); // Kiểm tra
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    // Reset form sau khi thêm
    setFormData({ name: "", class: "", age: "" });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Quản lý danh sách sinh viên</h1>

      {/* Form thêm sinh viên */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Thêm sinh viên mới</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Họ tên"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="text"
            name="class"
            value={formData.class}
            onChange={handleInputChange}
            placeholder="Lớp"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Tuổi"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <button
          onClick={handleAddStudent}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Thêm sinh viên
        </button>
      </div>

      {/* Thông báo thành công */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-sm shadow z-10">
          {successMessage}
        </div>
      )}

      {/* Bảng hiển thị danh sách sinh viên */}
      <div className="bg-white p-6 rounded-lg shadow">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="text-left px-4 py-3">Tên</th>
              <th className="text-left px-4 py-3">Lớp</th>
              <th className="text-left px-4 py-3">Tuổi</th>
              <th className="text-left px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{student.name}</td>
                <td className="px-4 py-3">{student.class}</td>
                <td className="px-4 py-3">{student.age}</td>
                <td className="px-4 py-3">
                  <button className="text-red-600 hover:text-red-800 bg-transparent border-none p-0">
                    Xoá
                  </button>
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