package ru.prbb.arm.hr.telephony;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the _4._102._23._172.welltime.wsdl.phone_call package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _MakeCallRequest_QNAME = new QName("http://172.23.102.4/welltime/wsdl/phone_call/", "MakeCallRequest");
    private final static QName _PickUpCallRequest_QNAME = new QName("http://172.23.102.4/welltime/wsdl/phone_call/", "PickUpCallRequest");
    private final static QName _MakeCallResponse_QNAME = new QName("http://172.23.102.4/welltime/wsdl/phone_call/", "MakeCallResponse");
    private final static QName _QueueAddResponse_QNAME = new QName("http://172.23.102.4/welltime/wsdl/phone_call/", "QueueAddResponse");
    private final static QName _PickUpCallResponse_QNAME = new QName("http://172.23.102.4/welltime/wsdl/phone_call/", "PickUpCallResponse");
    private final static QName _QueueDelRequest_QNAME = new QName("http://172.23.102.4/welltime/wsdl/phone_call/", "QueueDelRequest");
    private final static QName _SpyCallRequest_QNAME = new QName("http://172.23.102.4/welltime/wsdl/phone_call/", "SpyCallRequest");
    private final static QName _HelpCallRequest_QNAME = new QName("http://172.23.102.4/welltime/wsdl/phone_call/", "HelpCallRequest");
    private final static QName _QueueAddRequest_QNAME = new QName("http://172.23.102.4/welltime/wsdl/phone_call/", "QueueAddRequest");
    private final static QName _SpyCallResponse_QNAME = new QName("http://172.23.102.4/welltime/wsdl/phone_call/", "SpyCallResponse");
    private final static QName _HelpCallResponse_QNAME = new QName("http://172.23.102.4/welltime/wsdl/phone_call/", "HelpCallResponse");
    private final static QName _QueueDelResponse_QNAME = new QName("http://172.23.102.4/welltime/wsdl/phone_call/", "QueueDelResponse");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: _4._102._23._172.welltime.wsdl.phone_call
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link QueueRegRequest }
     * 
     */
    public QueueRegRequest createQueueRegRequest() {
        return new QueueRegRequest();
    }

    /**
     * Create an instance of {@link CmdResponse }
     * 
     */
    public CmdResponse createCmdResponse() {
        return new CmdResponse();
    }

    /**
     * Create an instance of {@link CallRequest }
     * 
     */
    public CallRequest createCallRequest() {
        return new CallRequest();
    }

    /**
     * Create an instance of {@link AddDialTarget }
     * 
     */
    public AddDialTarget createAddDialTarget() {
        return new AddDialTarget();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link CallRequest }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://172.23.102.4/welltime/wsdl/phone_call/", name = "MakeCallRequest")
    public JAXBElement<CallRequest> createMakeCallRequest(CallRequest value) {
        return new JAXBElement<CallRequest>(_MakeCallRequest_QNAME, CallRequest.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link CallRequest }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://172.23.102.4/welltime/wsdl/phone_call/", name = "PickUpCallRequest")
    public JAXBElement<CallRequest> createPickUpCallRequest(CallRequest value) {
        return new JAXBElement<CallRequest>(_PickUpCallRequest_QNAME, CallRequest.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://172.23.102.4/welltime/wsdl/phone_call/", name = "MakeCallResponse")
    public JAXBElement<Boolean> createMakeCallResponse(Boolean value) {
        return new JAXBElement<Boolean>(_MakeCallResponse_QNAME, Boolean.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link CmdResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://172.23.102.4/welltime/wsdl/phone_call/", name = "QueueAddResponse")
    public JAXBElement<CmdResponse> createQueueAddResponse(CmdResponse value) {
        return new JAXBElement<CmdResponse>(_QueueAddResponse_QNAME, CmdResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://172.23.102.4/welltime/wsdl/phone_call/", name = "PickUpCallResponse")
    public JAXBElement<String> createPickUpCallResponse(String value) {
        return new JAXBElement<String>(_PickUpCallResponse_QNAME, String.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link QueueRegRequest }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://172.23.102.4/welltime/wsdl/phone_call/", name = "QueueDelRequest")
    public JAXBElement<QueueRegRequest> createQueueDelRequest(QueueRegRequest value) {
        return new JAXBElement<QueueRegRequest>(_QueueDelRequest_QNAME, QueueRegRequest.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link CallRequest }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://172.23.102.4/welltime/wsdl/phone_call/", name = "SpyCallRequest")
    public JAXBElement<CallRequest> createSpyCallRequest(CallRequest value) {
        return new JAXBElement<CallRequest>(_SpyCallRequest_QNAME, CallRequest.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link CallRequest }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://172.23.102.4/welltime/wsdl/phone_call/", name = "HelpCallRequest")
    public JAXBElement<CallRequest> createHelpCallRequest(CallRequest value) {
        return new JAXBElement<CallRequest>(_HelpCallRequest_QNAME, CallRequest.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link QueueRegRequest }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://172.23.102.4/welltime/wsdl/phone_call/", name = "QueueAddRequest")
    public JAXBElement<QueueRegRequest> createQueueAddRequest(QueueRegRequest value) {
        return new JAXBElement<QueueRegRequest>(_QueueAddRequest_QNAME, QueueRegRequest.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://172.23.102.4/welltime/wsdl/phone_call/", name = "SpyCallResponse")
    public JAXBElement<Boolean> createSpyCallResponse(Boolean value) {
        return new JAXBElement<Boolean>(_SpyCallResponse_QNAME, Boolean.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Boolean }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://172.23.102.4/welltime/wsdl/phone_call/", name = "HelpCallResponse")
    public JAXBElement<Boolean> createHelpCallResponse(Boolean value) {
        return new JAXBElement<Boolean>(_HelpCallResponse_QNAME, Boolean.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link CmdResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://172.23.102.4/welltime/wsdl/phone_call/", name = "QueueDelResponse")
    public JAXBElement<CmdResponse> createQueueDelResponse(CmdResponse value) {
        return new JAXBElement<CmdResponse>(_QueueDelResponse_QNAME, CmdResponse.class, null, value);
    }

}
