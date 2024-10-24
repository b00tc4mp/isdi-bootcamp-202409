import './Comments.css'

import { Input, Button, Form, Label, PasswordInput } from '../library'

export default () =>
    <section>
        <ul>
            <li>
                <h4>Username</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit repellat quo nesciunt animi rem. In impedit nihil, aperiam laborum doloribus nemo recusandae illum optio tempora eius quo aut? Amet, nostrum!</p>
                <time>3 days ago</time>
            </li>
            <li>
                <h4>Username</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit repellat quo nesciunt animi rem. In impedit nihil, aperiam laborum doloribus nemo recusandae illum optio tempora eius quo aut? Amet, nostrum!</p>
                <time>3 days ago</time>
            </li>
            <li>
                <h4>Username</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit repellat quo nesciunt animi rem. In impedit nihil, aperiam laborum doloribus nemo recusandae illum optio tempora eius quo aut? Amet, nostrum!</p>
                <time>3 days ago</time>
            </li>
        </ul>
        <Form>
            <Label htmlFor="textComment">Comment</Label>
            <Input id="textComment"></Input>
            <Button>Comment</Button>
        </Form>
    </section>
