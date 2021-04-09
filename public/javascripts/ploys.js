class Ploys{
    constructor(){};

    static getPloy = async (id) => {

    }

    static createPloy = async (ployObj) => {
        const postedPloy = await fetch('/app/ploys', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ployObj)
        });
        const postPloy = await postedPloy.json();
        return postPloy;
    }

    static searchPloys = async (searchString) => {
        const ploys = await fetch(`/app/search/${searchString}`);
        const ploysObj = await ploys.json();
        return ploysObj;
    }

    static deletePloy = async (ployId) => {
        return await fetch(`/app/ploys/${ployId}`, {
            method: "DELETE"
        });
    }
}
export default Ploys;
