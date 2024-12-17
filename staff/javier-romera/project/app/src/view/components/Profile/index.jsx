import { Form, Field, Label, Input, Button } from '../../library'

import useController from './useController'

export default function Profile({ setProfileView }) {
    const {
        userDetails,

        handleSubmit
    } = useController()

    const handleCloseClick = () => {
        setProfileView(false)
    }

    return <section className="w-screen h-screen top-0 fixed flex justify-center items-center z-[20]">
        <div onClick={handleCloseClick} className="w-screen h-screen top-0 fixed bg-[black] opacity-50"></div>

        {userDetails && <div className="w-[55%] h-[70%] bg-[rgba(241,241,241,0.98)] z-[30] rounded-[.5rem] border-[2px] border-[black] overflow-y-auto flex flex-col items-start px-[2rem] pt-[1rem]">
            <div className="fixed h-[3rem] w-[inherit] flex justify-end">
                <Button onClick={handleCloseClick} className="text-[2rem] px-[.5rem] mr-[3.5rem]">𐢫</Button>
            </div>
            <div className="flex flex-col items-start">
                <h2 className="text-[2rem]">Profile</h2>
                <span className="mt-[-1rem]">____________________________</span>

                <p className="text-[1.5rem] mt-[2rem] font-bold">{userDetails.username}</p>
                <p className="mt-[.5rem]">Your bounty: <strong>{userDetails.score}</strong> berries!</p>
            </div>

            <div className="flex flex-col items-start mt-[2.5rem]">
                <h2 className="text-[2rem]">Account</h2>
                <span className="mt-[-1rem]">____________________________</span>
                <p className="text-[1.125rem]">Fill the fields you want to update</p>
                <p className="text-[.9rem]">Be sure to fill all the password fields if you want to change your password!</p>

                <Form onSubmit={handleSubmit} className="flex flex-col items-center mt-[1rem] gap-[.75rem]">
                    <Field className="flex flex-col items-start gap-[.25rem]">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" type="text" placeholder={userDetails.username} autoComplete="off" className="px-[.25rem] rounded-[.25rem] border-[2px] border-[black] focus:outline-none" />
                    </Field>

                    <Field className="flex flex-col items-start gap-[.25rem]">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="text" placeholder={userDetails.email} autoComplete="off" className="px-[.25rem] rounded-[.25rem] border-[2px] border-[black] focus:outline-none" />
                    </Field>

                    <Field className="flex flex-col items-start gap-[.25rem] mt-[2rem]">
                        <Label htmlFor="old-password">Old password</Label>
                        <Input id="old-password" type="password" placeholder="Old password" autoComplete="off" className="px-[.25rem] rounded-[.25rem] border-[2px] border-[black] focus:outline-none" />
                    </Field>
                    <Field className="flex flex-col items-start gap-[.25rem]">
                        <Label htmlFor="new-password">New password</Label>
                        <Input id="new-password" type="password" placeholder="New password" autoComplete="off" className="px-[.25rem] rounded-[.25rem] border-[2px] border-[black] focus:outline-none" />
                    </Field>
                    <Field className="flex flex-col items-start gap-[.25rem]">
                        <Label htmlFor="new-password-repeat">Repeat new password</Label>
                        <Input id="new-password-repeat" type="password" placeholder="Repeat new password" autoComplete="off" className="px-[.25rem] rounded-[.25rem] border-[2px] border-[black] focus:outline-none" />
                    </Field>

                    <Button id="updateButton" className="mt-[1rem] mb-[4rem] bg-[rgba(175,255,255,0.9)] px-[.75rem] py-[.125rem] border-[2px] border-black rounded-[.5rem] transition-transform duration-100 ease-in-out hover:scale-105">Update</Button>
                </Form>
            </div>
        </div>}
    </section>
}