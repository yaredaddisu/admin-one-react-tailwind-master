import { mdiCheckDecagram, mdiEye, mdiGithub, mdiPlus, mdiTableBorder, mdiTableOff, mdiTrashCan } from '@mdi/js'
import React, { useEffect, useState } from 'react'
import { useSampleClients } from '../../hooks/sampleData'
import { Client } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import UserAvatar from '../UserAvatar'
import { Formik, Form, Field } from 'formik'
import CardBox from '../CardBox'
import FormCheckRadio from '../Form/CheckRadio'
import PillTag from '../PillTag'
import UserAvatarCurrentUser from '../UserAvatar/CurrentUser'
import axios from 'axios'
import Modal from '../Modal'
import RegistrationForm from '../RegistrationForm'
import SectionTitleLineWithButton from '../Section/TitleLineWithButton'
import NotificationBar from '../NotificationBar'

const TableSampleClients = () => {
  // const clients  = useSampleClients()
  const [clients, setUsers] = useState([]);

  useEffect(() => {
   getUsers();
  }, [ ]);

  const getUsers = () => {
  
    axios
      .get("/api/users")
      .then(({ data }) => {
       
        setUsers(data.data);
       console.log(data.data)
      })
      .catch(() => {
        
      });
  };


  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = clients.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [userData, setUser] = useState([]);

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  function editUser(client): void {
     
    setIsModalOpen(true);
    setUser(client);
  }
  const closeModal = () => {
    getUsers();
    setIsModalOpen(false);
  };

  return (
    <><div className="mt-6 mr-5">
      <SectionTitleLineWithButton icon="" title=" " main >
        <Button
          // href="https://github.com/justboil/admin-one-react-tailwind"
          // target="_blank"
          icon={mdiPlus}
          label="Add"
          color="contrast"
          roundedFull
          small
          onClick={() => setIsModalOpen(true)} />
      </SectionTitleLineWithButton>
    </div><><Modal isOpen={isModalOpen} onClose={closeModal}>
      <RegistrationForm userData={userData} onClose={closeModal} getUsers={getUsers} />
    </Modal>

        <CardBoxModal
          title="Sample modal"
          buttonColor="info"
          buttonLabel="Done"
          isActive={isModalInfoActive}
          onConfirm={handleModalAction}
          onCancel={handleModalAction}
        >
          <p>
            Lorem ipsum dolor sit amet <b>adipiscing elit</b>
          </p>
          <p>This is sample modal</p>
        </CardBoxModal><CardBoxModal
          title="Please confirm"
          buttonColor="danger"
          buttonLabel="Confirm"
          isActive={isModalTrashActive}
          onConfirm={handleModalAction}
          onCancel={handleModalAction}
        >
          <p>
            Lorem ipsum dolor sit amet <b>adipiscing elit</b>
          </p>
          <p>This is sample modal</p>
        </CardBoxModal><CardBox>
          <div className="flex flex-col lg:flex-row items-center justify-around lg:justify-center">
            <UserAvatarCurrentUser className="mb-6 lg:mb-0 lg:mx-12" />
            <div className="space-y-3 text-center md:text-left lg:mx-12">
              <div className="flex justify-center md:block">

              </div>

            </div>
          </div>
        </CardBox>
        
        <table>
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Company</th>
              <th>City</th>
              <th>Progress</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>

            {clientsPaginated.map((client: Client) => (
              <>
                {/* <pre>{JSON.stringify(client, null, 2)};
      </pre>
       */}
                <tr key={client.id}>
                  <td className="border-b-0 lg:w-6 before:hidden">
                    <UserAvatar username={client.firstName} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                  </td>
                  <td data-label="Company">{client.firstName}</td>
                  <td data-label="Company">{client.lastName}</td>
                  <td data-label="Name">{client.chat_id}</td>

                  <td data-label="City">{client.phone}</td>
                  <td data-label="Name">{client.email}</td>
                  <td data-label="Company">{client.latitude}</td>
                  <td data-label="City">{client.longitude}</td>
                  <td data-label="Name">{client.skills}</td>
                  <td data-label="Company">{client.experience}</td>
                  <td data-label="City">{client.status}</td>
                  <td data-label="Name">{client.role}</td>
                  <td data-label="Company">{client.availability}</td>
                  <td data-label="City">{client.username}</td>

                  <td data-label="Created" className="lg:w-1 whitespace-nowrap">
                    <small className="text-gray-500 dark:text-slate-400">{client.created_at}</small>
                  </td>
                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <Buttons type="justify-start lg:justify-end" noWrap>


                      <Button
                        color="info"
                        icon={mdiEye}
                        onClick={() => editUser(client)}
                        small />
                      <Button
                        color="danger"
                        icon={mdiTrashCan}
                        onClick={() => setIsModalTrashActive(true)}
                        small />
                    </Buttons>
                  </td>
                </tr></>
            ))}
          </tbody>
        </table>
        {!clients.length && (


       
        <div >
        <NotificationBar color="danger" icon={mdiTableOff}>
          <b>Empty card.</b> When there&apos;s nothing to show
        </NotificationBar>
        </div>
         ) }
        <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
            <Buttons>
              {pagesList.map((page) => (
                <Button
                  key={page}
                  active={page === currentPage}
                  label={page + 1}
                  color={page === currentPage ? 'lightDark' : 'whiteDark'}
                  small
                  onClick={() => setCurrentPage(page)} />
              ))}
            </Buttons>
            <small className="mt-6 md:mt-0">
              Page {currentPage + 1} of {numPages}
            </small>
          </div>
        </div></></>
  
  )
}

export default TableSampleClients
