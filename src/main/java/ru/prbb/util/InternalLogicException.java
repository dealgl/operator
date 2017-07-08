package ru.prbb.util;

public class InternalLogicException extends Exception {

    private static final long serialVersionUID = 1L;
    private static final String CODE_BUSINESS_LOGIC = "business";

    public InternalLogicException(String message) {
        super(message);
    }

    public InternalLogicException(String message, Throwable cause) {
        super(message, cause);
    }

    public String getErrorCode() {
        return CODE_BUSINESS_LOGIC;
    }

}
