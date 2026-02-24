import { StyleSheet, View, ScrollView, Platform } from "react-native";
import React, { useState } from "react";
import { FormTextInput, ValidationText, UserLayout } from "../../components";
import { useForm } from "@tanstack/react-form";
import { Button, Text, useTheme, HelperText } from "react-native-paper";
import DatePicker from "react-native-date-picker";
import { useMutation } from "@tanstack/react-query";
import { createUserApi } from "../../services/user.api";

const CreateUser = ({ navigation }) => {
  const paperTheme = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const createUserMutation = useMutation({
    mutationFn: createUserApi,
    onSuccess: (data) => {
      navigation.goBack();
    },
    onError: (error) => {},
  });

  const { handleSubmit, Field, Subscribe, setFieldValue } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      login: {
        uuid: "",
        username: "",
        password: "",
        md5: "",
        sha1: "",
        registered: "",
      },
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
      phone: "",
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: "",
      },
    },
    onSubmit: async ({ value }) => {
      // Format the data for API
      const userData = {
        ...value,
        // Generate UUID or let server handle it
        login: {
          ...value.login,
          uuid: value.login.uuid || `user-${Date.now()}`,
          registered: value.login.registered || new Date().toISOString(),
        },
      };

      await createUserMutation.mutateAsync(userData);
    },
  });

  const onDateChange = (date) => {
    setSelectedDate(date);
    // Format date as YYYY-MM-DD for the API
    const formattedDate = date.toISOString().split("T")[0];
    setFieldValue("birthDate", formattedDate);
    setShowDatePicker(false);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <UserLayout horizontal>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Name Row */}
        <Text
          style={[styles.sectionTitle, { color: paperTheme.colors.primary }]}
        >
          User Information
        </Text>
        <View style={styles.rowBetween}>
          <View style={styles.halfWidth}>
            <Field
              name="firstName"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "First Name is required";
                  if (value.length < 2)
                    return "First Name must be at least 2 characters";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <FormTextInput
                  field={field}
                  label="First Name"
                  placeholder="Enter first name"
                />
              )}
            </Field>
          </View>

          <View style={styles.halfWidth}>
            <Field
              name="lastName"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "Last Name is required";
                  if (value.length < 2)
                    return "Last Name must be at least 2 characters";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <FormTextInput
                  field={field}
                  label="Last Name"
                  placeholder="Enter last name"
                />
              )}
            </Field>
          </View>
        </View>

        {/* Email */}
        <Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value) return "Email is required";
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return emailRegex.test(value)
                ? undefined
                : "Please enter a valid email";
            },
          }}
        >
          {(field) => (
            <FormTextInput
              field={field}
              label="Email"
              placeholder="Enter email address"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        </Field>

        {/* Birth Date with Picker */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: paperTheme.colors.onSurface }]}>
            Birth Date
          </Text>
          <Button
            mode="elevated"
            onPress={() => {
              console.log(showDatePicker);
              setShowDatePicker(true);
            }}
          >
            {formatDate(selectedDate)}
          </Button>

          {/* <DatePicker
            modal
            open={showDatePicker}
            date={selectedDate}
            onConfirm={onDateChange}
            onCancel={() => setShowDatePicker(false)}
            maximumDate={new Date()}
            mode="date"
          /> */}
        </View>

        {/* Phone */}
        <Field
          name="phone"
          validators={{
            onChange: ({ value }) => {
              if (value && value.length < 10)
                return "Phone number is too short";
              return undefined;
            },
          }}
        >
          {(field) => (
            <FormTextInput
              field={field}
              label="Phone"
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          )}
        </Field>

        {/* Website */}
        <Field
          name="website"
          validators={{
            onChange: ({ value }) => {
              if (value && !value.includes("."))
                return "Please enter a valid website";
              return undefined;
            },
          }}
        >
          {(field) => (
            <FormTextInput
              field={field}
              label="Website"
              placeholder="Enter website (e.g., www.example.com)"
              autoCapitalize="none"
            />
          )}
        </Field>

        {/* Login Section */}
        <Text
          style={[styles.sectionTitle, { color: paperTheme.colors.primary }]}
        >
          Login Information
        </Text>

        <Field
          name="login.username"
          validators={{
            onChange: ({ value }) => {
              if (!value) return "Username is required";
              if (value.length < 3)
                return "Username must be at least 3 characters";
              return undefined;
            },
          }}
        >
          {(field) => (
            <FormTextInput
              field={field}
              label="Username"
              placeholder="Enter username"
              autoCapitalize="none"
            />
          )}
        </Field>

        <Field
          name="login.password"
          validators={{
            onChange: ({ value }) => {
              if (!value) return "Password is required";
              if (value.length < 6)
                return "Password must be at least 6 characters";
              return undefined;
            },
          }}
        >
          {(field) => (
            <FormTextInput
              field={field}
              label="Password"
              placeholder="Enter password"
              secureTextEntry
            />
          )}
        </Field>

        {/* Address Section */}
        <Text
          style={[styles.sectionTitle, { color: paperTheme.colors.primary }]}
        >
          Address Information
        </Text>

        <Field name="address.street">
          {(field) => (
            <FormTextInput
              field={field}
              label="Street"
              placeholder="Enter street address"
            />
          )}
        </Field>

        <View style={styles.rowBetween}>
          <View style={styles.halfWidth}>
            <Field name="address.suite">
              {(field) => (
                <FormTextInput
                  field={field}
                  label="Suite/Apt"
                  placeholder="Suite or Apt #"
                />
              )}
            </Field>
          </View>

          <View style={styles.halfWidth}>
            <Field name="address.city">
              {(field) => (
                <FormTextInput
                  field={field}
                  label="City"
                  placeholder="Enter city"
                />
              )}
            </Field>
          </View>
        </View>

        <View style={styles.rowBetween}>
          <View style={styles.halfWidth}>
            <Field name="address.zipcode">
              {(field) => (
                <FormTextInput
                  field={field}
                  label="Zip Code"
                  placeholder="Enter zip code"
                  keyboardType="numeric"
                />
              )}
            </Field>
          </View>
        </View>

        {/* Company Section */}
        <Text
          style={[styles.sectionTitle, { color: paperTheme.colors.primary }]}
        >
          Company Information
        </Text>

        <Field name="company.name">
          {(field) => (
            <FormTextInput
              field={field}
              label="Company Name"
              placeholder="Enter company name"
            />
          )}
        </Field>

        <Field name="company.catchPhrase">
          {(field) => (
            <FormTextInput
              field={field}
              label="Catch Phrase"
              placeholder="Enter company catch phrase"
              multiline
              numberOfLines={2}
            />
          )}
        </Field>

        <Field name="company.bs">
          {(field) => (
            <FormTextInput
              field={field}
              label="Business"
              placeholder="Enter business type"
            />
          )}
        </Field>

        {/* Submit Button */}
        <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              mode="contained"
              onPress={handleSubmit}
              disabled={!canSubmit || createUserMutation.isPending}
              loading={createUserMutation.isPending}
              style={styles.submitButton}
              contentStyle={styles.submitButtonContent}
            >
              {createUserMutation.isPending ? "Creating..." : "Create User"}
            </Button>
          )}
        </Subscribe>
      </ScrollView>
    </UserLayout>
  );
};

export default CreateUser;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 32,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  dateButton: {
    borderRadius: 8,
    borderWidth: 1,
  },
  dateButtonContent: {
    height: 48,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 32,
    borderRadius: 8,
  },
  submitButtonContent: {
    height: 48,
  },
});
