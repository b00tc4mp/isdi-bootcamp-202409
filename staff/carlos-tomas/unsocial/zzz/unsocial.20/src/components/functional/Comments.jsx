import { Label } from '../library'
import { Form } from '../library'
import { Button } from '../library'



export default () => <section>
    <ul>
        <li>
            <h4>username</h4>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam in maxime id, expedita quaerat, corporis dolorum earum vero culpa omnis officia ducimus ipsum ipsam sequi praesentium dolores dolor. Ipsam, possimus.</p>
            <time>4 days</time>
        </li>

        <Form>
            <Label htmlFor="text">New comment</Label>
            <textarea id="text"></textarea>

            <Button type="submit">Send</Button>
        </Form>
    </ul>
</section>