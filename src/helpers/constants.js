export const generateFormContent = (firstName, lastName,contact, job,shift, setFirstName,setLastName,setContact,setJob,setShift) => {
    const formContent = [
        {
          id: 0,
          header: "Personal Information",
          subtitle: "Enter your personal details",
          input: [
            {
              label: "First Name",
              value: firstName,
              onchange: setFirstName,
              placeholder: "Enter first name",
            },
            {
              label: "Last Name",
              value: lastName,
              onchange: setLastName,
              placeholder: "Enter last name",
            },
          ],
          isSubmitButton: false,
        },
        {
          id: 1,
          header: "Other Information",
          subtitle: "Enter your other relevant information",
          input: [
            {
              label: "Contact Information",
              value: contact,
              onchange: setContact,
              placeholder: "Enter contact number",
            },
            {
              label: "Job Position",
              value: job,
              onchange: setJob,
              placeholder: "Enter job position",
            },
            {
              label: "Shift",
              value: shift,
              onchange: setShift,
              placeholder: "Enter shift",
            },
          ],
          isSubmitButton: false,
        },
        {
          id: 2,
          header: "Account Details",
          subtitle: "Enter your other relevant information",
          input: [
            {
              label: "Contact Information",
              value: contact,
              onchange: setContact,
              placeholder: "Enter contact number",
            },
            {
              label: "Job Position",
              value: lastName,
              onchange: setLastName,
              placeholder: "Enter last name",
            },
            {
                label: "Job Position",
                value: lastName,
                onchange: setLastName,
                placeholder: "Enter last name",
              },
            {
              label: "Shift",
              value: lastName,
              onchange: setLastName,
              placeholder: "Enter last name",
            },
          ],
          isSubmitButton: true,
        },
      ];
return formContent
}
