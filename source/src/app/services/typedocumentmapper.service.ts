import { Injectable } from "@angular/core";
import { DomainItem } from "../interfaces/DomainItem";
import { BuildXMLRequest, IXMLtoArrayMapperService } from "./abstract/imapper.service";

@Injectable()
export class CBObjectMapperService implements 
    IXMLtoArrayMapperService<string, DomainItem>, BuildXMLRequest<string> {

    buildXMLRequest(domain:string): string {
        return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://integration.services.support.gyf.com/">
           <soapenv:Header />
           <soapenv:Body>
              <int:commonsServices>
                 <arg0>
                    <cadenaElementos>`+domain+`</cadenaElementos>
                    <contextTransaction>
                       <codTypeTx>PGI</codTypeTx>
                       <idConsumer>APPCB</idConsumer>
                       <idService>APPCB</idService>
                       <idTx>759e7cc4-50ec-000f-9eb7-5d8a61af6c43</idTx>
                       <idUser>APPCB</idUser>
                    </contextTransaction>
                 </arg0>
              </int:commonsServices>
           </soapenv:Body>
        </soapenv:Envelope>`;
    }

    transform(xml: string): DomainItem[] {
        let documentTypes: DomainItem[] = [];

        const parser = new DOMParser();
        const doc: any = parser.parseFromString(xml, "text/xml");
        const itemsDoc = doc.getElementsByTagName("valueDomain");

        for (var i = 0; i < itemsDoc.length; i++) {
            var description = itemsDoc[i].getElementsByTagName("description").length > 0?itemsDoc[i].getElementsByTagName("description")[0].innerHTML:itemsDoc[i].getElementsByTagName("name")[0].innerHTML;
            var id = itemsDoc[i].getElementsByTagName("idValueDomain")[0].innerHTML;
            var name = itemsDoc[i].getElementsByTagName("name")[0].innerHTML;
            var code = itemsDoc[i].getElementsByTagName("code")[0].innerHTML;
            var parentRef = itemsDoc[i].getElementsByTagName("fatherValueDomain")[0].innerHTML;
            var item: DomainItem = {
                value: description,
                id: id,
                idValueDomain: id,
                name: name, 
                code: code,
                parentRef: parentRef
            };
            documentTypes.push(item);
        }

        return documentTypes;
    }

}