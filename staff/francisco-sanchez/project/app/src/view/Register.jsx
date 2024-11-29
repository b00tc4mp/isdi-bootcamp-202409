export default function Register(props) {
    console.log('Register -> render')

    return <main className="flex justify-center items-center flex-col h-full box-border bg-[var(--back-color)]">
        <h2 className="">Register</h2>
        <div className="flex flex-col">
            <form>
                <field>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" />
                </field>

                <field>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" />
                </field>

                <field>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" />
                </field>

                <field>
                    <label htmlFor="password">Password</label>
                    <input id="password" />
                </field>

                <field>
                    <label htmlFor="password-repeat">Repeat Password</label>
                    <input id="password-repeat" />
                </field>

                <button type="submit">Register</button>
            </form>

            <a href="">Login</a>
        </div>
    </main>
}