package main.java.ru.prbb.util;

import org.springframework.beans.factory.annotation.Autowired;

public class AutoSend {

    @Autowired
    private AutoSendService service;

    public void doIt() {
        service.invokeMethod();
    }

}
