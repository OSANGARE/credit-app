import { FormItemProps, InputProps, SelectProps } from 'antd';

type FieldConfig = {
  name: string;
  label: string;
  type: 'input' | 'select' | 'number' | 'email' | 'date';
  options?: Array<{ label: string; value: any }>;
  validationRules: FormItemProps['rules'];
  componentProps?: InputProps | SelectProps<any>;
};

export const creditFormConfig: FieldConfig[] = [
  {
    name: 'firstName',
    label: 'Prénom',
    type: 'input',
    validationRules: [
      { required: true, message: 'Le prénom est obligatoire' },
      { min: 2, message: 'Minimum 2 caractères' },
      { max: 50, message: 'Maximum 50 caractères' }
    ],
    componentProps: {
      placeholder: 'Jean',
    }
  },
  {
    name: 'lastName',
    label: 'Nom de famille',
    type: 'input',
    validationRules: [
      { required: true, message: 'Le nom est obligatoire' },
      { pattern: /^[a-zA-Z\- ]+$/, message: 'Caractères alphabétiques seulement' }
    ]
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    validationRules: [
      { required: true, message: 'Email obligatoire' },
      { type: 'email', message: 'Format invalide' }
    ],
    componentProps: {
      placeholder: 'exemple@domaine.com',
    }
  },
  {
    name: 'phone',
    label: 'Téléphone',
    type: 'input',
    validationRules: [
      { required: true, message: 'Téléphone obligatoire' },
      { pattern: /^[0-9+ ]+$/, message: 'Numéro invalide' }
    ],
    componentProps: {
      placeholder: '+33 6 12 34 56 78',
    }
  },
  {
    name: 'amount',
    label: 'Montant (€)',
    type: 'number',
    validationRules: [
      { required: true, message: 'Montant obligatoire' },
      { type: 'number', min: 1000, message: 'Minimum 1 000€' },
      { type: 'number', max: 100000, message: 'Maximum 100 000€' }
    ],
    componentProps: {
      step: 500,
      min: 1000,
      max: 100000,
    }
  },
  {
    name: 'term',
    label: 'Durée (mois)',
    type: 'select',
    options: [
      { label: '12 mois', value: 12 },
      { label: '24 mois', value: 24 },
      { label: '36 mois', value: 36 },
      { label: '48 mois', value: 48 },
      { label: '60 mois', value: 60 }
    ],
    validationRules: [
      { required: true, message: 'Durée obligatoire' }
    ]
  },
  {
    name: 'purpose',
    label: 'Objectif du crédit',
    type: 'select',
    options: [
      { label: 'Travaux', value: 'renovation' },
      { label: 'Voiture', value: 'car' },
      { label: 'Projet personnel', value: 'personal' },
      { label: 'Autre', value: 'other' }
    ],
    validationRules: [
      { required: true, message: 'Sélectionnez un objectif' }
    ]
  },
  {
    name: 'employmentStatus',
    label: 'Situation professionnelle',
    type: 'select',
    options: [
      { label: 'CDI', value: 'permanent' },
      { label: 'CDD', value: 'temporary' },
      { label: 'Indépendant', value: 'freelance' },
      { label: 'Autre', value: 'other' }
    ],
    validationRules: [
      { required: true, message: 'Sélectionnez votre statut' }
    ]
  }
];

// Types utilitaires pour l'utilisation dans le composant
export type CreditFormValues = {
  [K in typeof creditFormConfig[number]['name']]: any;
};

export const initialValues: Partial<CreditFormValues> = {
  term: 36, // Valeur par défaut
  purpose: 'personal'
};