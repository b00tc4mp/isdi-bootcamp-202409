import './Footer.css'

import Button from '../library/Button'

export default function Footer ({ onNewPostClick, view }){
    console.log('Footer -> render')

    return (
        <footer className="Footer">
            {view === 'post' && (
                <Button
                    type="button"
                    onClick={onNewPostClick}
                >
                    AddPost+
                </Button>
            )}
        </footer>
    );
    
}

