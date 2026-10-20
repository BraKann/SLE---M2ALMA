import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { PersonsDslAstType, Person } from './generated/ast.js';
import type { PersonsDslServices } from './persons-dsl-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: PersonsDslServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.PersonsDslValidator;
    const checks: ValidationChecks<PersonsDslAstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class PersonsDslValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
