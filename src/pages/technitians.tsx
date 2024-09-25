import {  mdiTableBorder } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useState } from 'react'
 
import CardBox from '../components/CardBox'
 
import LayoutAuthenticated from '../layouts/Authenticated'
 
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import TableSampleClients from '../components/Table/SampleClients'
import { getPageTitle } from '../config'
import Modal from '../components/CardBox/Modal'
import RegistrationForm from '../components/RegistrationForm'



const TablesPage = () => {

   

    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Head>
        <title>{getPageTitle('Technicians')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTableBorder} title="Technicians" main>
          {/* <Button
            // href="https://github.com/justboil/admin-one-react-tailwind"
            // target="_blank"
            icon={mdiGithub}
            label="Add"
            color="contrast"
            roundedFull
            small
            onClick={() => setIsModalOpen(true)}
          /> */}
        </SectionTitleLineWithButton>
{/* 
        <NotificationBar color="info" icon={mdiMonitorCellphone}>
          <b>Responsive table.</b> Collapses on mobile
        </NotificationBar> */}
        <div>
       
       <Modal isActive={isModalOpen} onCancel={closeModal} title={'Technicians Registration'} buttonColor={'info'} buttonLabel={''} onConfirm={function (): void {
                      throw new Error('Function not implemented.')
                  } }>
         <RegistrationForm userData={undefined} onClose={undefined} getUsers={undefined}  />
       </Modal>
     </div>
        <CardBox className="mb-6" hasTable>
          <TableSampleClients />
        </CardBox>

        {/* <SectionTitleLineWithButton icon={mdiTableOff} title="Empty variation" /> */}

        {/* <NotificationBar color="danger" icon={mdiTableOff}>
          <b>Empty card.</b> When there&apos;s nothing to show
        </NotificationBar> */}

        {/* <CardBox>
          <CardBoxComponentEmpty />
        </CardBox> */}
      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
