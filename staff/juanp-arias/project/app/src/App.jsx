import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Login, Register, WelcomeScreen, Home, Profile, Calendar, Notes, Tasks, Groups } from './view'
import { Header, Footer, Alert, Confirm, CreateNote, EditNote, EditReminder, TeacherTasks } from './view/components'
import { Context } from './view/useContext'
import logic from './logic'

export default function App() {
  const [alert, setAlert] = useState({
    message: null,
    level: 'error'
  })

  const [confirm, setConfirm] = useState({
    message: null,
    level: 'error',
    callback: null
  })

  const navigate = useNavigate()

  const handleStartedClick = () => navigate('/register')

  const handleConfigurationClick = () => navigate('/profile')
  const handleHomeClick = () => navigate('/home')

  const handleUserLoggedIn = () => navigate('/home')

  const handleCancelClick = () => navigate('/home')
  const handleCreateNoteClick = () => navigate('/notes/new-note')
  const handleViewRemindersClick = () => navigate('/calendar')
  const handleCheckTasksClick = () => navigate('/tasks')
  const handleCreateGroupClick = () => navigate('/groups')
  const handleViewNotesClick = () => navigate('/notes')
  const handleTasksCreatedClick = () => navigate('/teacher/tasks')

  const handleGoBackClick = () => navigate('/welcome')

  const handleLoginClick = () => navigate('/login')

  const handleUserRegistered = () => navigate('/welcome')

  const handleLogout = () => navigate('/welcome')

  const handleNoteCreated = () => navigate('/notes')
  const handleNoteEdited = () => navigate('/notes')

  const handleNoteEditClick = (noteId) => navigate(`/notes/${noteId}`)

  const handleReminderEditClick = (reminderId) => navigate(`/reminders/${reminderId}`)
  const handleReminderEdited = () => navigate('/calendar')

  const handleAlertAccepted = () => setAlert({
    message: null,
    level: 'error'
  })

  const handleConfirmAccepted = () => {
    confirm.callback(true)

    setConfirm({
      message: null,
      level: 'error',
      callback: null
    })
  }

  const handleConfirmCancelled = () => {
    confirm.callback(false)

    setConfirm({
      message: null,
      level: 'error',
      callback: null
    })
  }
  return <Context.Provider value={{
    alert(message, level = 'error') { setAlert({ message, level }) },
    confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }) }
  }}>
    {logic.isUserLoggedIn() && <Header onLoggedOut={handleLogout} configurationClick={handleConfigurationClick} backHomeClick={handleHomeClick} />}

    <Routes>
      <Route path="/welcome" element={logic.isUserLoggedIn() ? <Home /> : <WelcomeScreen onStartedClick={handleStartedClick} onLoginClick={handleLoginClick} />} />

      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onBackClick={handleGoBackClick} />} />

      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} onBackClick={handleGoBackClick} />} />

      <Route path="/home" element={logic.isUserLoggedIn() ? <Home onCreateNoteClick={handleCreateNoteClick} onViewRemindersClick={handleViewRemindersClick} onCheckTasksClick={handleCheckTasksClick} onCreateGroupClick={handleCreateGroupClick} onViewNotesClick={handleViewNotesClick} onTasksCreatedClick={handleTasksCreatedClick} /> : <Navigate to="/welcome" />} />

      <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/welcome" />} />

      <Route path="/profile" element={logic.isUserLoggedIn() ? <Profile onCancelClick={handleCancelClick} /> : <Navigate to="/welcome" />} />

      <Route path="/calendar" element={logic.isUserLoggedIn() ? <Calendar onEditClick={handleReminderEditClick} /> : <Navigate to="/welcome" />} />

      <Route path="/reminders/:reminderId" element={logic.isUserLoggedIn() ? <EditReminder onEdited={handleReminderEdited} onCancelClick={handleReminderEdited} /> : <Navigate to="/welcome" />} />

      <Route path="/notes" element={logic.isUserLoggedIn() ? <Notes onEditClick={handleNoteEditClick} /> : <Navigate to="/welcome" />} />

      <Route path="/notes/new-note" element={logic.isUserLoggedIn() ? <CreateNote onCreated={handleNoteCreated} onCancelClick={handleNoteEdited} /> : <Navigate to="/welcome" />} />

      <Route path="/notes/:noteId" element={logic.isUserLoggedIn() ? <EditNote onEdited={handleNoteEdited} onCancelClick={handleNoteEdited} /> : <Navigate to="/welcome" />} />

      <Route path="/tasks" element={logic.isUserLoggedIn() && logic.isUserRoleStudent() ? <Tasks /> : <Navigate to="/welcome" />} />

      <Route path="/teacher/tasks" element={logic.isUserLoggedIn() && logic.isUserRoleTeacher() ? <TeacherTasks /> : <Navigate to="/welcome" />} />

      <Route path="/groups" element={logic.isUserLoggedIn() && logic.isUserRoleTeacher() ? <Groups /> : <Navigate to="/welcome" />} />

    </Routes>
    {logic.isUserLoggedIn() && <Footer />}

    {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

    {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
  </Context.Provider>
}