import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinner from "../../components/LoadingSpiner";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

const UserDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [technicians, setTechnicians] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [chatId, setChatId] = useState(null);
  const [sentData, setSentData] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [skillsOptions, setSkillsOptions] = useState([]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSendMessage = async (jobDetails) => {
    const mapUrl = `https://www.openstreetmap.org/?mlat=${jobDetails.latitude}&mlon=${jobDetails.longitude}#map=13/${jobDetails.latitude}/${jobDetails.longitude}`;
  
    const messageText = `
      <b>Job ID:</b> ${jobDetails.id}\n
      <b>Job Reference:</b> ${jobDetails.Reference}\n
      <b>Title:</b> ${jobDetails.title}\n
      <b>Description:</b> ${jobDetails.description}\n
      <b>Company:</b> ${jobDetails.company}\n
      <b>Location:</b> ${jobDetails.location}\n
      <b>Status:</b> ${jobDetails.status === '1' ? 'In Progress 🟢' : jobDetails.status === '2' ? 'Completed 🔵' : jobDetails.status === '3' ? 'Confirmed 🟡' : 'Cancelled 🔴'}\n
      <b>First Name:</b> ${sentData.firstName}\n
      <b>Last Name:</b> ${sentData.lastName}\n
      <b>Phone:</b> ${sentData.phone}\n
      <b>Email:</b> ${sentData.email}\n
      <b>Username:</b> @${sentData.username}\n
      <b>Created At:</b> ${new Date(jobDetails.created_at).toLocaleString()}\n
      <b>Updated At:</b> ${new Date(jobDetails.updated_at).toLocaleString()}
    `;
    
    const inlineButtons = [
      [
        { text: 'Approve', callback_data: `approveJob_${jobDetails.id}_${sentData.id}` },
        { text: 'Reject', callback_data: `rejectJob_${jobDetails.id}_${sentData.id}` }
      ],
      [
        { text: 'View Map', url: mapUrl }
      ]
    ];

    const token = 'YOUR_TELEGRAM_BOT_TOKEN';
    
    if (isChecked) {
      const telegramMessage = {
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML',
        reply_markup: JSON.stringify({
          inline_keyboard: inlineButtons
        })
      };

      try {
        await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, telegramMessage);
        console.log('Message sent to Telegram user successfully');
      } catch (error) {
        console.error('Failed to send message to Telegram:', error);
      }
    }

    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: description
    })
    .then(response => {
      console.log('Message sent:', response.data);
      setDescription('');
      setIsModalVisible(false);
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
  };

  useEffect(() => {
    if (!id) return; // Prevent fetching if id is not available

    axios.get(`/api/users/${id}`)
      .then(response => {
        setChatId(response.data.chat_id);
        setSentData(response.data);

        const item = response.data;
        const parsedSkills = JSON.parse(item.skills || '[]');
        const skillNames = parsedSkills.map(skill => skill.name).join(', ');

        const processedData = {
          ...item,
          skillsOptions: skillNames
        };

        setTechnicians([processedData]);
      })
      .catch(error => {
        console.error('There was an error fetching the user details!', error);
      });
  }, [id]);

  if (!technicians.length) {
    return <LoadingSpinner />;
  }

  const statusStyles = {
    1: 'text-yellow-500 bg-yellow-100', // In Progress
    2: 'text-green-500 bg-green-100',   // Completed
    0: 'text-red-500 bg-red-100',       // Canceled
    3: 'text-blue-500 bg-blue-100'      // Confirmed
  };

  const avaStyles = {
    1: 'text-green-500 bg-green-100',   // Available
    0: 'text-red-500 bg-red-100',       // Unavailable
  };

  const statusBodyTemplate = (rowData) => {
    const status = rowData.status;
    const statusText = {
      1: 'In Progress',
      2: 'Completed',
      0: 'Cancelled',
      3: 'Confirmed'
    }[status] || 'Unknown';

    const styleClass = statusStyles[status] || 'text-gray-500 bg-gray-100';

    return (
      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${styleClass}`}>
        {statusText}
      </span>
    );
  };

  const statusAvailability = (rowData) => {
    const availability = rowData.availability;
    const statusText = {
      1: 'Available',
      0: 'Unavailable',
    }[availability] || 'Unknown';

    const styleClass = avaStyles[availability] || 'text-gray-500 bg-gray-100';

    return (
      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${styleClass}`}>
        {statusText}
      </span>
    );
  };

  const descriptionBodyTemplate = (rowData) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleDescription = () => {
      setIsExpanded(!isExpanded);
    };

    const maxLength = 50; // Max length before truncating the description
    const description = rowData.description || ''; // Ensure description is a string

    return (
      <div>
        {isExpanded || description.length <= maxLength
          ? description
          : description.substring(0, maxLength) + '...'}
        {description.length > maxLength && (
          <span
            onClick={toggleDescription}
            style={{ color: 'blue', cursor: 'pointer' }}
          >
            {isExpanded ? ' Show Less' : ' Read More'}
          </span>
        )}
      </div>
    );
  };

  const jobTechniciansTemplate = (job) => {
    return (
      job.job_technicians && (
        <div className="bg-gray-100 shadow-md rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-semibold text-gray-800">
              Job Technicians for Job: <span className="text-indigo-600">{job.id}</span>
            </h5>
            <button
              className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
              onClick={() => setIsModalVisible(true)}
            >
              Send Message
            </button>
          </div>

          {isModalVisible && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Send Message</h2>
                <textarea
                  className="w-full h-32 p-2 border border-gray-300 rounded-lg mb-4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition duration-300"
                    onClick={() => setIsModalVisible(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
                    onClick={() => handleSendMessage(sentData)}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="overflow-x-auto">
            {job.job_technicians.map((technician) => (
              <div key={technician.id}>{technician.name}</div> // Accessing a property of technician
            ))}
          </div>
        </div>
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <DataTable value={technicians} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}>
        <Column field="firstName" header="First Name" />
        <Column field="lastName" header="Last Name" />
        <Column field="email" header="Email" />
        <Column field="phone" header="Phone" />
        <Column field="status" header="Status" body={statusBodyTemplate} />
        <Column field="availability" header="Availability" body={statusAvailability} />
        <Column field="description" header="Description" body={descriptionBodyTemplate} />
        <Column body={jobTechniciansTemplate} />
      </DataTable>
    </div>
  );
};

export default UserDetails;
