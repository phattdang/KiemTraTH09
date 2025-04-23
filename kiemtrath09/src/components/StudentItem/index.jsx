function StudentItem({ student, onEdit, onDelete }) {
    return (
      <tr className="border-t hover:bg-gray-50">
        <td className="px-4 py-3">{student.name}</td>
        <td className="px-4 py-3">{student.class}</td>
        <td className="px-4 py-3">{student.age}</td>
        <td className="px-4 py-3 space-x-2">
          <button
            onClick={() => onEdit(student)}
            className="text-blue-600 hover:text-blue-800 bg-transparent border-none p-0"
          >
            Sửa
          </button>
          <button
            onClick={() => onDelete(student.id)}
            className="text-red-600 hover:text-red-800 bg-transparent border-none p-0"
          >
            Xoá
          </button>
        </td>
      </tr>
    );
  }
  
  export default StudentItem;