import type { ValidationChecks } from 'langium';
import type { DialogueDslV2AstType } from './generated/ast.js';
import type { DialogueDslV2Services } from './dialogue-dsl-v-2-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: DialogueDslV2Services) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.DialogueDslV2Validator;
    const checks: ValidationChecks<DialogueDslV2AstType> = {
        // TODO: Declare validators for your properties
        // See doc : https://langium.org/docs/learn/workflow/create_validations/
        /*
        Element: validator.checkElement
        */
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class DialogueDslV2Validator {

    // TODO: Add logic here for validation checks of properties
    // See doc : https://langium.org/docs/learn/workflow/create_validations/
    /*
    checkElement(element: Element, accept: ValidationAcceptor): void {
        // Always accepts
    }
    */
}
