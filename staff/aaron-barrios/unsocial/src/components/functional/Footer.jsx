import './Footer.css'

export default ({ onNewPostClick, view }) => {
    return <footer className="Footer">
        {view === 'home' &&
            <button type="button" onClick={onNewPostClick}>+</button>}

    </footer>
}