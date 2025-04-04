package com.saathratri.developer.blog.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class SetEntityByOrganizationAsserts {

    /**
     * Asserts that the entity has all properties (fields) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSetEntityByOrganizationAllPropertiesEquals(SetEntityByOrganization expected, SetEntityByOrganization actual) {
        assertSetEntityByOrganizationAutoGeneratedPropertiesEquals(expected, actual);
        assertSetEntityByOrganizationAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSetEntityByOrganizationAllUpdatablePropertiesEquals(
        SetEntityByOrganization expected,
        SetEntityByOrganization actual
    ) {
        assertSetEntityByOrganizationUpdatableFieldsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSetEntityByOrganizationAutoGeneratedPropertiesEquals(
        SetEntityByOrganization expected,
        SetEntityByOrganization actual
    ) {
        assertThat(expected)
            .as("Verify SetEntityByOrganization auto generated properties")
            .satisfies(e -> assertThat(e.getOrganizationId()).as("check organizationId").isEqualTo(actual.getOrganizationId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSetEntityByOrganizationUpdatableFieldsEquals(
        SetEntityByOrganization expected,
        SetEntityByOrganization actual
    ) {
        assertThat(expected).as("Verify SetEntityByOrganization relevant properties");
    }
}
