import { z } from "zod";

const create = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    }),
    abbreviation: z
        .string({
            invalid_type_error: "Abbreviation must be a string"
        })
        .min(1, { message: "Abbreviation cannot be empty" }).optional(),
});


const update = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    }).optional(),
    abbreviation: z
        .string({
            invalid_type_error: "Abbreviation must be a string"
        })
        .min(1, { message: "Abbreviation cannot be empty" }).optional(),
});


export const unitValidationSchema = {
    create,
    update
}


