import React, { useEffect, useState } from 'react'
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa'
import Loader from '../../../helpers/loader'
import { toast } from 'react-toastify'
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../../../../redux/api/usersApiSlice'
import Message from '../../../helpers/message'
import AdminMenu from '../admin_menu'

const UsersList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [updateUser] = useUpdateUserMutation()

  const [editableUserId, setEditableUserId] = useState(null)
  const [editableUserName, setEditableUserName] = useState('')
  const [editableUserEmail, setEditableUserEmail] = useState('')

  useEffect(() => {
    refetch()
  }, [refetch])

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure to delete this user?')) {
      try {
        await deleteUser(id).unwrap()
        toast.success('User deleted successfully')
        refetch()
      } catch (error) {
        toast.error(error.data?.message || error.error)
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id)
    setEditableUserName(username)
    setEditableUserEmail(email)
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      }).unwrap()

      setEditableUserId(null)
      toast.success('User updated successfully')
      refetch()
    } catch (error) {
      toast.error(error.data?.message || error.error)
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 ml-[9rem]">
        User <span className='text-[#d81b60]'>Management.</span>
      </h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error?.message}</Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <AdminMenu/>
          <table className="w-full md:w-4/5 mx-auto bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border border-[#2c2c2c] font-medium">Id</th>
                <th className="px-4 py-2 text-left border border-[#2c2c2c] font-medium">Username</th>
                <th className="px-4 py-2 text-left border border-[#2c2c2c] font-medium">Email Address</th>
                <th className="px-4 py-2 text-left border border-[#2c2c2c] font-medium">Admin</th>
                <th className="px-5 py-2 text-left border border-[#2c2c2c] font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 border border-[#404040]">{user._id}</td>
                  <td className="px-4 py-2 border border-[#404040]">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="w-full p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-[#2196f3] text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.username}{' '}
                        <button
                          onClick={() => toggleEdit(user._id, user.username, user.email)}
                        >
                          <FaEdit className="ml-[1rem]" size={19} />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 border border-[#404040]">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="w-full p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-[#2196f3] text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <p>{user.email}</p>
                        <button
                          onClick={() => toggleEdit(user._id, user.username, user.email)}
                        >
                          <FaEdit className="ml-[1rem]" size={19} />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 border border-[#404040]">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: '#007f5f' }} size={21} />
                    ) : (
                      <FaTimes style={{ color: '#e53935' }} size={21} />
                    )}
                  </td>
                  <td className="px-4 py-2 border border-[#404040]">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-[#e53935] text-white hover:bg-[#d32f2f] font-bold py-2 px-2 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersList;
