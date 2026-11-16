package com.petcare;

import com.petcare.util.RutUtil;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class RutUtilTest {

    @Test
    void normalizaPuntosYMayusculas() {
        assertEquals("12345678-5", RutUtil.normalizar("12.345.678-5"));
    }

    @Test
    void aceptaRutsValidos() {
        assertTrue(RutUtil.esValido("12345678-5"));
        assertTrue(RutUtil.esValido("11111111-1"));
        assertTrue(RutUtil.esValido("9876543-3"));
    }

    @Test
    void rechazaRutsInvalidos() {
        assertFalse(RutUtil.esValido("12345678-9"));
        assertFalse(RutUtil.esValido("abc"));
        assertFalse(RutUtil.esValido(null));
    }
}
