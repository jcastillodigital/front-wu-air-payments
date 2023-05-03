export interface IXMLtoArrayMapperService<S, T> {
    transform(xml: S): T[];
}

export interface BuildXMLRequest<D> {
    buildXMLRequest(data: D): string;
}


export interface IXMLtoObjectMapperService<S, T> {
    xmlToDto(xml: S): T;
    dtoToXML(dto: T): S;
}