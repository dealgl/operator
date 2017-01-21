package ru.prbb.arm.hr.telephony;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * Тип описывающий операцию с очередью и номером
 * 						телефонии
 * 						QueueNum - номер очереди
 * 						SubscriberNum - номер агента или порта
 * 						Penalty - опциональный параметр
 * 						Paused - опциональный параметр
 * 					
 * 
 * <p>Java class for QueueRegRequest complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="QueueRegRequest">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="QueueNum" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="SubscriberNum" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="Penalty" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Paused" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="Timeout" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "QueueRegRequest", propOrder = {
    "queueNum",
    "subscriberNum",
    "penalty",
    "paused",
    "timeout"
})
public class QueueRegRequest {

    @XmlElement(name = "QueueNum", required = true)
    protected String queueNum;
    @XmlElement(name = "SubscriberNum", required = true)
    protected String subscriberNum;
    @XmlElement(name = "Penalty")
    protected String penalty;
    @XmlElement(name = "Paused")
    protected String paused;
    @XmlElement(name = "Timeout")
    protected Integer timeout;

    /**
     * Gets the value of the queueNum property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getQueueNum() {
        return queueNum;
    }

    /**
     * Sets the value of the queueNum property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setQueueNum(String value) {
        this.queueNum = value;
    }

    /**
     * Gets the value of the subscriberNum property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSubscriberNum() {
        return subscriberNum;
    }

    /**
     * Sets the value of the subscriberNum property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSubscriberNum(String value) {
        this.subscriberNum = value;
    }

    /**
     * Gets the value of the penalty property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPenalty() {
        return penalty;
    }

    /**
     * Sets the value of the penalty property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPenalty(String value) {
        this.penalty = value;
    }

    /**
     * Gets the value of the paused property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPaused() {
        return paused;
    }

    /**
     * Sets the value of the paused property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPaused(String value) {
        this.paused = value;
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

}
