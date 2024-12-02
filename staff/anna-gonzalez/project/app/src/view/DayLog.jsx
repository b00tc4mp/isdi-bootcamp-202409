import { getMonthAndDayText } from "../util"

import { Button } from './library'

export default function DayLog() {
    return <>
        <h2>Symptoms and activities</h2>
        <p className="mb-8">{getMonthAndDayText()}</p>

        <fieldset className="mt-4 flex flex-wrap gap-4">
            <legend>SYMPTOMS</legend>

            <div>
                <input type="checkbox" id="fatigue" name="fatigue" />
                <label for="fatigue">Fatigue</label>
            </div>

            <div>
                <input type="checkbox" id="headache" name="headache" />
                <label for="headache">Headache</label>
            </div>

            <div>
                <input type="checkbox" id="cramps" name="cramps" />
                <label for="cramps">Cramps</label>
            </div>

            <div>
                <input type="checkbox" id="tenderBreasts" name="tenderBreasts" />
                <label for="tenderBreasts">Tender breasts</label>
            </div>

            <div>
                <input type="checkbox" id="acne" name="acne" />
                <label for="acne">Acne</label>
            </div>

            <div>
                <input type="checkbox" id="backache" name="backache" />
                <label for="backache">Backache</label>
            </div>

            <div>
                <input type="checkbox" id="cravings" name="cravings" />
                <label for="cravings">Cravings</label>
            </div>

            <div>
                <input type="checkbox" id="abdominalPain" name="abdominalPain" />
                <label for="abdominalPain">Abdominal pain</label>
            </div>

            <div>
                <input type="checkbox" id="dryness" name="dryness" />
                <label for="dryness">Dryness</label>
            </div>
        </fieldset>

        <fieldset className="mt-4 flex flex-wrap gap-4">
            <legend>MOOD</legend>

            <div>
                <input type="radio" id="calm" name="mood" value="calm" />
                <label for="calm">Calm</label>
            </div>

            <div>
                <input type="radio" id="happy" name="mood" value="happy" />
                <label for="happy">Happy</label>
            </div>

            <div>
                <input type="radio" id="moodSwings" name="mood" value="moodSwings" />
                <label for="moodSwings">Mood swings</label>
            </div>

            <div>
                <input type="radio" id="sad" name="mood" value="sad" />
                <label for="sad">Sad</label>
            </div>

            <div>
                <input type="radio" id="anxious" name="mood" value="anxious" />
                <label for="anxious">Anxious</label>
            </div>
        </fieldset>

        <fieldset className="mt-4 flex flex-wrap gap-4">
            <legend>ENERGY</legend>

            <div>
                <input type="radio" id="lowEnergy" name="energy" value="lowEnergy" />
                <label for="lowEnergy">Low</label>
            </div>

            <div>
                <input type="radio" id="moderateEnergy" name="energy" value="moderateEnergy" />
                <label for="moderateEnergy">Moderate</label>
            </div>

            <div>
                <input type="radio" id="highEnergy" name="energy" value="highEnergy" />
                <label for="highEnergy">High</label>
            </div>
        </fieldset>

        <fieldset className="mt-4 flex flex-wrap gap-4">
            <legend>FLOW</legend>

            <div>
                <input type="radio" id="noDischarge" name="flow" value="noDischarge" />
                <label for="noDischarge">No discharge</label>
            </div>

            <div>
                <input type="radio" id="creamy" name="flow" value="creamy" />
                <label for="creamy">Creamy</label>
            </div>

            <div>
                <input type="radio" id="watery" name="flow" value="watery" />
                <label for="watery">Watery</label>
            </div>
        </fieldset>

        <fieldset className="mt-4 flex flex-wrap gap-4">
            <legend>SLEEP</legend>

            <div>
                <input type="radio" id="poorSleep" name="sleep" value="poorSleep" />
                <label for="poorSleep">Poor</label>
            </div>

            <div>
                <input type="radio" id="averageSleep" name="sleep" value="averageSleep" />
                <label for="averageSleep">Average</label>
            </div>

            <div>
                <input type="radio" id="goodSleep" name="sleep" value="goodSleep" />
                <label for="goodSleep">Good</label>
            </div>
        </fieldset>

        <fieldset className="mt-4 flex flex-wrap gap-4">
            <legend>SEXUAL ACTIVITY</legend>

            <div>
                <input type="radio" id="noSex" name="sexualActivity" value="noSex" />
                <label for="noSex">No sex</label>
            </div>

            <div>
                <input type="radio" id="sex" name="sexualActivity" value="sex" />
                <label for="sex">Sex</label>
            </div>
        </fieldset>

        <fieldset className="mt-4 flex flex-wrap gap-4">
            <legend>SEXUAL ENERGY</legend>

            <div>
                <input type="radio" id="lowSexEnergy" name="sexualEnergy" value="lowSexEnergy" />
                <label for="lowSexEnergy">Low</label>
            </div>

            <div>
                <input type="radio" id="moderateSexEnergy" name="sexualEnergy" value="moderateSexEnergy" />
                <label for="moderateSexEnergy">Moderate</label>
            </div>

            <div>
                <input type="radio" id="highSexEnergy" name="sexualEnergy" value="highSexEnergy" />
                <label for="highSexEnergy">High</label>
            </div>

            <Button type="submit">Save</Button>
        </fieldset>
    </>
}