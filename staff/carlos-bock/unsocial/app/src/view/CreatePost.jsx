import logic from '../logic'

import {Label, Input, Button, Form, Field} from '../components/library'

import './CreatePost.css'

export default function CreatePost({onCreated}){
    console.log('CreatePost -> render');

    const handleSubmit = event => {
        event.preventDefault();

        const {target:form} = event;

        const {
            image: {value:image},
            text: {value: text}
        } = form;


        try {
            logic.createPost(image, text, error => {
                if(error) {
                    alert(error.message);

                    console.error(error);

                    return;
                }

                onCreated();
            });
        } catch (error) {
            alert(error.message);

            console.error(error);
        }
    }
    //consider removing style elements below.
    return <main className="CreatePost">
        <Form onSubmit={handleSubmit}>
                <Field>
                    <Label htmlFor="image">Image</Label>
                    <Input type="text" id="image" style= {{width: '100%', boxSizing: 'border-box'}}/>
                </Field>

                <Field>
                    <Label htmlFor="text">Text</Label>
                    <Input type="text" id="text" style={{width:'100%', boxSizing:"border-box"}}/>
                </Field>
                
                <Button type="submit">Create</Button>
        </Form>
    </main>
};