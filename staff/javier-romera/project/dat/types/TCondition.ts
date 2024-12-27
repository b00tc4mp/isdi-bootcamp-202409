type TCondition = {
    type: string,
    property: string,
    value: Boolean | String | Number,
    direction: string,
    indexes: number[],
    text: string
}

export default TCondition