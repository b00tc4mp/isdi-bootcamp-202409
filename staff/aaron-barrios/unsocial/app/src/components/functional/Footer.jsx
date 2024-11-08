import './Footer.css'

export default function Footer({ onNewPostClick, view }) {
    return <footer className="Footer">
        {view === 'posts' &&
            <button type="button" onClick={onNewPostClick}>+</button>}

    </footer>
}