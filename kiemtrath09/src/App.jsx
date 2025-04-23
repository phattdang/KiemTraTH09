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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    class: "",
    age: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState(""); // Trạng thái cho lớp được chọn

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = () => {
    if (!formData.name || !formData.class || !formData.age) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const newStudent = {
      id: students.length + 1,
      name: formData.name,
      class: formData.class,
      age: parseInt(formData.age),
    };

    setStudents([...students, newStudent]);
    setSuccessMessage("Thêm thành công!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
    setFormData({ name: "", class: "", age: "" });
  };

  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    setSuccessMessage("Xoá thành công!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleEditStudent = (student) => {
    setCurrentStudent(student);
    setEditFormData({
      name: student.name,
      class: student.class,
      age: student.age,
    });
    setIsModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    if (!editFormData.name || !editFormData.class || !editFormData.age) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const updatedStudents = students.map((student) =>
      student.id === currentStudent.id
        ? { ...student, ...editFormData, age: parseInt(editFormData.age) }
        : student
    );
    setStudents(updatedStudents);
    setSuccessMessage("Sửa thành công!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStudent(null);
  };

  // Lấy danh sách các lớp duy nhất từ dữ liệu sinh viên
  const uniqueClasses = [...new Set(students.map((student) => student.class))];

  // Lọc sinh viên theo tên và lớp
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedClass === "" || student.class === selectedClass)
  );

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

      {/* Thanh tìm kiếm và lọc theo lớp */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm theo tên..."
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Tất cả các lớp</option>
          {uniqueClasses.map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>
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
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{student.name}</td>
                <td className="px-4 py-3">{student.class}</td>
                <td className="px-4 py-3">{student.age}</td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => handleEditStudent(student)}
                    className="text-blue-600 hover:text-blue-800 bg-transparent border-none p-0"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className="text-red-600 hover:text-red-800 bg-transparent border-none p-0"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal chỉnh sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Chỉnh sửa thông tin sinh viên</h2>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditInputChange}
                placeholder="Họ tên"
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                name="class"
                value={editFormData.class}
                onChange={handleEditInputChange}
                placeholder="Lớp"
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="number"
                name="age"
                value={editFormData.age}
                onChange={handleEditInputChange}
                placeholder="Tuổi"
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-800"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;