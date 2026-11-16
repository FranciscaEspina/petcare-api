package com.petcare.util;

/** Utilidades para RUT chileno: normaliza ("12.345.678-5" -> "12345678-5") y valida el dígito verificador. */
public final class RutUtil {

    private RutUtil() {
    }

    public static String normalizar(String rut) {
        if (rut == null) {
            return null;
        }
        return rut.replace(".", "").replace(" ", "").toUpperCase();
    }

    /** Recibe un RUT ya normalizado con formato cuerpo-dv. */
    public static boolean esValido(String rutNormalizado) {
        if (rutNormalizado == null || !rutNormalizado.matches("^\\d{7,8}-[0-9K]$")) {
            return false;
        }
        String[] partes = rutNormalizado.split("-");
        String cuerpo = partes[0];
        char dv = partes[1].charAt(0);

        int suma = 0;
        int multiplicador = 2;
        for (int i = cuerpo.length() - 1; i >= 0; i--) {
            suma += Character.getNumericValue(cuerpo.charAt(i)) * multiplicador;
            multiplicador = (multiplicador == 7) ? 2 : multiplicador + 1;
        }
        int resto = 11 - (suma % 11);
        char esperado;
        if (resto == 11) {
            esperado = '0';
        } else if (resto == 10) {
            esperado = 'K';
        } else {
            esperado = (char) ('0' + resto);
        }
        return dv == esperado;
    }
}
