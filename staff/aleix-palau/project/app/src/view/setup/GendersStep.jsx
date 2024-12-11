import { Button, Form, Field, Label, Checkbox } from '../library';
import logic from '../../logic';
import { errors } from 'com';
import useContext from '../useContext';

const { SystemError } = errors;

export default function GenderStage(props) {
    console.log('GenderStage -> render');

    const { alert } = useContext();

    const genders = ['Man', 'Woman', 'Beyond binary']; // Gender options

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const selectedGenders = genders.filter(gender => formData.get(gender));

        const showOnProfile = formData.get('showOnProfile') === 'on';

        if (selectedGenders.length === 0) {
            alert('Please select at least one gender.');
            return;
        }

        try {
            logic.updateUser({ genders: selectedGenders, showGenderOnProfile: showOnProfile })
                .then(() => {
                    props.onSetupComplete();
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later.');
                    else
                        alert(error.message);

                    console.error(error);
                });
        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    };

    return (
        <main className="justify-self-center">
            <h2>Which gender best represents you?</h2>
            <p>Add one or more genders to enrich your profile with your unique identity.</p>

            <Form onSubmit={handleSubmit}>
                {genders.map(gender => (
                    <Field key={gender}>
                        <Label>
                            <input type="checkbox" name={gender} />
                            {gender}
                        </Label>
                    </Field>
                ))}

                <Field>
                    <Label>
                        <Checkbox id="showOnProfile" name="showOnProfile" />
                        Show gender on profile
                    </Label>
                </Field>

                <Button type="submit">Next</Button>
            </Form>
        </main>
    );
}
