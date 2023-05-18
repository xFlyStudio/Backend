const addPrefixMapper = (prefix: string): Function => {
    return (route: any) => {
        route.path = `${prefix}${route.path}`;
        return route;
    };
};

export default addPrefixMapper;
