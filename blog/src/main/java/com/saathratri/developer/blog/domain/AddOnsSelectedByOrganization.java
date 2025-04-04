package com.saathratri.developer.blog.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.Table;

/**
 * A AddOnsSelectedByOrganization.
 */
// Since spring-data-cassandra 3.4.2, table names needs to be in lowercase
// See https://github.com/spring-projects/spring-data-cassandra/issues/1293#issuecomment-1192555467
@Table("add_ons_selected_by_organization")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AddOnsSelectedByOrganization implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private AddOnsSelectedByOrganizationId compositeId;

    @Column("departure_date")
    @CassandraType(type = CassandraType.Name.BIGINT)
    private Long departureDate;

    @Column("customer_id")
    @CassandraType(type = CassandraType.Name.UUID)
    private UUID customerId;

    @Column("customer_first_name")
    @CassandraType(type = CassandraType.Name.TEXT)
    private String customerFirstName;

    @Column("customer_last_name")
    @CassandraType(type = CassandraType.Name.TEXT)
    private String customerLastName;

    @Column("customer_updated_email")
    @CassandraType(type = CassandraType.Name.TEXT)
    private String customerUpdatedEmail;

    @Column("customer_updated_phone_number")
    @CassandraType(type = CassandraType.Name.TEXT)
    private String customerUpdatedPhoneNumber;

    @Column("customer_estimated_arrival_time")
    @CassandraType(type = CassandraType.Name.TEXT)
    private String customerEstimatedArrivalTime;

    @Column("tiny_url_short_code")
    @CassandraType(type = CassandraType.Name.TEXT)
    private String tinyUrlShortCode;

    @Column("add_on_details_text")
    @CassandraType(type = CassandraType.Name.MAP, typeArguments = { CassandraType.Name.TEXT, CassandraType.Name.TEXT })
    private Map<String, String> addOnDetailsText;

    @Column("add_on_details_decimal")
    @CassandraType(type = CassandraType.Name.MAP, typeArguments = { CassandraType.Name.TEXT, CassandraType.Name.DECIMAL })
    private Map<String, BigDecimal> addOnDetailsDecimal;

    @Column("add_on_details_boolean")
    @CassandraType(type = CassandraType.Name.MAP, typeArguments = { CassandraType.Name.TEXT, CassandraType.Name.BOOLEAN })
    private Map<String, Boolean> addOnDetailsBoolean;

    @Column("add_on_details_big_int")
    @CassandraType(type = CassandraType.Name.MAP, typeArguments = { CassandraType.Name.TEXT, CassandraType.Name.BIGINT })
    private Map<String, Long> addOnDetailsBigInt;

    public AddOnsSelectedByOrganizationId getCompositeId() {
        return this.compositeId;
    }

    public void setCompositeId(AddOnsSelectedByOrganizationId compositeId) {
        this.compositeId = compositeId;
    }

    public AddOnsSelectedByOrganization compositeId(AddOnsSelectedByOrganizationId compositeId) {
        this.compositeId = compositeId;
        return this;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getDepartureDate() {
        return this.departureDate;
    }

    public AddOnsSelectedByOrganization departureDate(Long departureDate) {
        this.setDepartureDate(departureDate);
        return this;
    }

    public void setDepartureDate(Long departureDate) {
        this.departureDate = departureDate;
    }

    public UUID getCustomerId() {
        return this.customerId;
    }

    public AddOnsSelectedByOrganization customerId(UUID customerId) {
        this.setCustomerId(customerId);
        return this;
    }

    public void setCustomerId(UUID customerId) {
        this.customerId = customerId;
    }

    public String getCustomerFirstName() {
        return this.customerFirstName;
    }

    public AddOnsSelectedByOrganization customerFirstName(String customerFirstName) {
        this.setCustomerFirstName(customerFirstName);
        return this;
    }

    public void setCustomerFirstName(String customerFirstName) {
        this.customerFirstName = customerFirstName;
    }

    public String getCustomerLastName() {
        return this.customerLastName;
    }

    public AddOnsSelectedByOrganization customerLastName(String customerLastName) {
        this.setCustomerLastName(customerLastName);
        return this;
    }

    public void setCustomerLastName(String customerLastName) {
        this.customerLastName = customerLastName;
    }

    public String getCustomerUpdatedEmail() {
        return this.customerUpdatedEmail;
    }

    public AddOnsSelectedByOrganization customerUpdatedEmail(String customerUpdatedEmail) {
        this.setCustomerUpdatedEmail(customerUpdatedEmail);
        return this;
    }

    public void setCustomerUpdatedEmail(String customerUpdatedEmail) {
        this.customerUpdatedEmail = customerUpdatedEmail;
    }

    public String getCustomerUpdatedPhoneNumber() {
        return this.customerUpdatedPhoneNumber;
    }

    public AddOnsSelectedByOrganization customerUpdatedPhoneNumber(String customerUpdatedPhoneNumber) {
        this.setCustomerUpdatedPhoneNumber(customerUpdatedPhoneNumber);
        return this;
    }

    public void setCustomerUpdatedPhoneNumber(String customerUpdatedPhoneNumber) {
        this.customerUpdatedPhoneNumber = customerUpdatedPhoneNumber;
    }

    public String getCustomerEstimatedArrivalTime() {
        return this.customerEstimatedArrivalTime;
    }

    public AddOnsSelectedByOrganization customerEstimatedArrivalTime(String customerEstimatedArrivalTime) {
        this.setCustomerEstimatedArrivalTime(customerEstimatedArrivalTime);
        return this;
    }

    public void setCustomerEstimatedArrivalTime(String customerEstimatedArrivalTime) {
        this.customerEstimatedArrivalTime = customerEstimatedArrivalTime;
    }

    public String getTinyUrlShortCode() {
        return this.tinyUrlShortCode;
    }

    public AddOnsSelectedByOrganization tinyUrlShortCode(String tinyUrlShortCode) {
        this.setTinyUrlShortCode(tinyUrlShortCode);
        return this;
    }

    public void setTinyUrlShortCode(String tinyUrlShortCode) {
        this.tinyUrlShortCode = tinyUrlShortCode;
    }

    public Map<String, String> getAddOnDetailsText() {
        return this.addOnDetailsText;
    }

    public AddOnsSelectedByOrganization addOnDetailsText(Map<String, String> addOnDetailsText) {
        this.setAddOnDetailsText(addOnDetailsText);
        return this;
    }

    public void setAddOnDetailsText(Map<String, String> addOnDetailsText) {
        this.addOnDetailsText = addOnDetailsText;
    }

    public Map<String, BigDecimal> getAddOnDetailsDecimal() {
        return this.addOnDetailsDecimal;
    }

    public AddOnsSelectedByOrganization addOnDetailsDecimal(Map<String, BigDecimal> addOnDetailsDecimal) {
        this.setAddOnDetailsDecimal(addOnDetailsDecimal);
        return this;
    }

    public void setAddOnDetailsDecimal(Map<String, BigDecimal> addOnDetailsDecimal) {
        this.addOnDetailsDecimal = addOnDetailsDecimal;
    }

    public Map<String, Boolean> getAddOnDetailsBoolean() {
        return this.addOnDetailsBoolean;
    }

    public AddOnsSelectedByOrganization addOnDetailsBoolean(Map<String, Boolean> addOnDetailsBoolean) {
        this.setAddOnDetailsBoolean(addOnDetailsBoolean);
        return this;
    }

    public void setAddOnDetailsBoolean(Map<String, Boolean> addOnDetailsBoolean) {
        this.addOnDetailsBoolean = addOnDetailsBoolean;
    }

    public Map<String, Long> getAddOnDetailsBigInt() {
        return this.addOnDetailsBigInt;
    }

    public AddOnsSelectedByOrganization addOnDetailsBigInt(Map<String, Long> addOnDetailsBigInt) {
        this.setAddOnDetailsBigInt(addOnDetailsBigInt);
        return this;
    }

    public void setAddOnDetailsBigInt(Map<String, Long> addOnDetailsBigInt) {
        this.addOnDetailsBigInt = addOnDetailsBigInt;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AddOnsSelectedByOrganization)) {
            return false;
        }
        return getCompositeId() != null && getCompositeId().equals(((AddOnsSelectedByOrganization) o).getCompositeId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AddOnsSelectedByOrganization{" +
            "compositeId=" + getCompositeId() +
            ", departureDate=" + getDepartureDate() +
            ", customerId='" + getCustomerId() + "'" +
            ", customerFirstName='" + getCustomerFirstName() + "'" +
            ", customerLastName='" + getCustomerLastName() + "'" +
            ", customerUpdatedEmail='" + getCustomerUpdatedEmail() + "'" +
            ", customerUpdatedPhoneNumber='" + getCustomerUpdatedPhoneNumber() + "'" +
            ", customerEstimatedArrivalTime='" + getCustomerEstimatedArrivalTime() + "'" +
            ", tinyUrlShortCode='" + getTinyUrlShortCode() + "'" +
            ", addOnDetailsText='" + getAddOnDetailsText() + "'" +
            ", addOnDetailsDecimal=" + getAddOnDetailsDecimal() +
            ", addOnDetailsBoolean='" + getAddOnDetailsBoolean() + "'" +
            ", addOnDetailsBigInt=" + getAddOnDetailsBigInt() +
            "}";
    }
}
