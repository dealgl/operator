package ru.prbb.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.security.SecureRandom;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class Translate {

    final static Log log = LogFactory.getLog(Translate.class);

    private static Map<Integer, Date> QUATERS = new HashMap<Integer, Date>();

    static {
        QUATERS.put(1, toDate("01.01." + Calendar.getInstance().get(Calendar.YEAR)));
        QUATERS.put(2, toDate("01.04." + Calendar.getInstance().get(Calendar.YEAR)));
        QUATERS.put(3, toDate("01.07." + Calendar.getInstance().get(Calendar.YEAR)));
        QUATERS.put(4, toDate("01.10." + Calendar.getInstance().get(Calendar.YEAR)));
    }

    public static String generateString() {
        Random rng = new Random();
        String characters = "abcdefghijklmnopqrstuvwxyz";
        char[] text = new char[8];
        for (int i = 0; i < 8; i++) {
            text[i] = characters.charAt(rng.nextInt(characters.length()));
        }
        return new String(text);
    }


    public static Double toDouble(String value) {
        Double ret = null;
        if (value == null || "".equals(value)) {
            return ret;
        }
        try {
            String s = value.replaceAll(",", ".");
            return Double.parseDouble(s);
        } catch (Exception e) {
            log.warn(e);
        }
        return ret;
    }

    public static String toPercent(String value, String format) {
        Double v = toDouble(value);
        if (v == null) {
            return "";
        } else {
            DecimalFormat fmt = new DecimalFormat(format);
            return fmt.format(v * 100);
        }
    }

    public static String toPercent(String value) {
        return toPercent(value, "#0.0000");
    }

    public static Date toDate(String value) {
        try {
            return new SimpleDateFormat("dd.MM.yyyy", new Locale("RU", "ru")).parse(value);
        } catch (ParseException e) {
            return null;
        }
    }

    public static Date toDateYMD(String value) {
        try {
            return new SimpleDateFormat("yyyy-MM-dd", new Locale("RU", "ru")).parse(value);
        } catch (ParseException e) {
            return null;
        }
    }

    public static String toString(Date date) {
        return date == null ? "" : new SimpleDateFormat("dd.MM.yyyy").format(date);
    }

    public static String toBIString(Date date) {
        return date == null ? "" : new SimpleDateFormat("dd-MM-yyyy").format(date);
    }

    public static String toSybaseFormatDate(Date date) {
        return date == null ? "" : new SimpleDateFormat("yyyy-MM-dd").format(date);
    }

    public static String makeInsurancePercents(String inputString) {
        DecimalFormat format = new DecimalFormat("#0.00");
        return format.format(Double.parseDouble(inputString.replaceAll(",", ".")) * 100) + "%";
    }

    public static String makePercents(String inputString) {
        DecimalFormat format = new DecimalFormat("#0.00");
        return format.format(Double.parseDouble(inputString.replaceAll(",", "."))) + "%";
    }

    public static String formatStringNumber(String inputString) {
        DecimalFormat format = new DecimalFormat("#0.00");


        return format.format(Double.parseDouble(inputString.replaceAll(",", ".")));
    }

    public static long calculateDaysBetweenDates(Date dateFrom, Date dateTo) {
        long days = (dateFrom.getTime() - dateTo.getTime()) / (1000 * 60 * 60 * 24);
        return days;
    }

    public static double calculateYearsBetweenDates(Date dateFrom, Date dateTo) {
        double years = ((dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24)) / 365;
        return years;
    }

    public static int getQuarter(Date date) {
        Calendar c = new GregorianCalendar();
        c.setTime(date);
        return c.get(Calendar.MONTH) / 3 + 1;
    }

    public static Date getQuaterBorder(Date date) {
        return QUATERS.get(getQuarter(date));
    }


    public static long calculateDaysBetweenQuaters(Date date) {
        int quater = getQuarter(date);

        return calculateDaysBetweenDates(QUATERS.get(quater + 1), QUATERS.get(quater));

    }

    public static Date operateMonths(Date date, int number) {
        //create Calendar instance
        Calendar now = Calendar.getInstance();

        now.setTime(date);

        now.add(Calendar.MONTH, number);

        return now.getTime();


    }

    public static int getMonth(Date date) {
        Calendar calendar = Calendar.getInstance();

        calendar.setTime(date);

        return calendar.get(Calendar.MONTH);
    }

    public static String getDateWithFirstDayOfMonth() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new java.util.Date());
        calendar.set(Calendar.YEAR, calendar.get(Calendar.YEAR));
        calendar.set(Calendar.MONTH, calendar.get(Calendar.MONTH));
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        return toBIString(calendar.getTime());
    }

    public static int getYear(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.YEAR);
    }
}
