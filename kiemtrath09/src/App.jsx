import { useState, useEffect } from 'react';
import StudentItem from './components/StudentItem';
import './App.css';

// Dữ liệu mẫu ban đầu
const initialStudents = [
  { id: 1, name: "Nguyen Van A", class: "CNTT1", age: 20 },
  { id: 2, name: "Tran Thi B", class: "CNTT2", age: 21 },
  { id: 3, name: "Le Van C", class: "CNTT1", age: 19 },
];

function App() {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : initialStudents;
  });
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
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

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

  const uniqueClasses = [...new Set(students.map((student) => student.class))];

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedClass === "" || student.class === selectedClass)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 border-b-2 border-gray-200 pb-4">
          Quản lý danh sách sinh viên
        </h1>

        {/* Form thêm sinh viên */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Thêm sinh viên mới</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Họ tên"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              placeholder="Lớp"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Tuổi"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>
          <button
            onClick={handleAddStudent}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm"
          >
            Thêm sinh viên
          </button>
        </div>

        {/* Thanh tìm kiếm và lọc theo lớp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm theo tên..."
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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
          <div className="mb-8 p-4 bg-green-100 text-green-800 rounded-lg text-sm font-medium shadow-sm animate-fade-in">
            {successMessage}
          </div>
        )}

        {/* Bảng hiển thị danh sách sinh viên */}
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-200 text-gray-600 uppercase">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">Tên</th>
                <th className="text-left px-6 py-4 font-semibold">Lớp</th>
                <th className="text-left px-6 py-4 font-semibold">Tuổi</th>
                <th className="text-left px-6 py-4 font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <StudentItem
                  key={student.id}
                  student={student}
                  onEdit={handleEditStudent}
                  onDelete={handleDeleteStudent}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal chỉnh sửa */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md transform transition-all duration-300 scale-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Chỉnh sửa thông tin sinh viên</h2>
              <div className="grid grid-cols-1 gap-4 mb-6">
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditInputChange}
                  placeholder="Họ tên"
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <input
                  type="text"
                  name="class"
                  value={editFormData.class}
                  onChange={handleEditInputChange}
                  placeholder="Lớp"
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <input
                  type="number"
                  name="age"
                  value={editFormData.age}
                  onChange={handleEditInputChange}
                  placeholder="Tuổi"
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;