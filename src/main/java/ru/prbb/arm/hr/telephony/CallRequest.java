
package ru.prbb.arm.hr.telephony;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * Тип CallRequest описывающий телефонный звонок.
 * 						Поле From - внутренний номер абонента, тот кто осуществляет вызов
 * 						Поле To - вызываемый номер внутренний или внешний
 * 						Поле CallerID - CallerID в формате "Имя <номер>", который будет
 * 						использовать при звонке
 * 						Поле Timeout - сколько ждать
 * 					
 * 
 * <p>Java class for CallRequest complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="CallRequest">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="From" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="To" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="Timeout" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *         &lt;element name="CallerID" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "CallRequest", propOrder = {
    "from",
    "to",
    "timeout",
    "callerID"
})
public class CallRequest {

    @XmlElement(name = "From", required = true)
    protected String from;
    @XmlElement(name = "To", required = true)
    protected String to;
    @XmlElement(name = "Timeout")
    protected Integer timeout;
    @XmlElement(name = "CallerID")
    protected String callerID;

    /**
     * Gets the value of the from property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFrom() {
        return from;
    }

    /**
     * Sets the value of the from property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFrom(String value) {
        this.from = value;
    }

    /**
     * Gets the value of the to property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTo() {
        return to;
    }

    /**
     * Sets the value of the to property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTo(String value) {
        this.to = value;
    }

    /**
     * Gets the value of the timeout property.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getTimeout() {
        return timeout;
    }

    /**
     * Sets the value of the timeout property.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setTimeout(Integer value) {
        this.timeout = value;
    }

    /**
     * Gets the value of the callerID property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCallerID() {
        return callerID;
    }

    /**
     * Sets the value of the callerID property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCallerID(String value) {
        this.callerID = value;
    }

}
