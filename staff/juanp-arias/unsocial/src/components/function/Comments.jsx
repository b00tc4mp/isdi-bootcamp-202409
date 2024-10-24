import { Button, Form, Label } from '../library'

export default () =>
    <section>
        <ul>
            <li>
                <h4>juanpablo</h4>
                <p>Lovely!</p>
                <time>1 day ago</time>
            </li>
            <li>
                <h4>pepito</h4>
                <p>Nice pic!</p>
                <time>2 days ago</time>
            </li>
        </ul>
        <Form>
            <Label htmlFor="text">New comment</Label>
            <textarea id="text"></textarea>

            <Button type="submit">Send</Button>
        </Form>
    </section>
