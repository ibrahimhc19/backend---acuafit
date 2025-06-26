<?php
namespace App\Enums;
enum TipoGrupo: string {
    case Adultos = 'Adultos';
    case Niños = 'Niños';
    case Apnea = 'Apnea';
    case Niños2a4 = 'Niños 2-4 años';
    case Hidroaerobicos = 'Hidroaeróbicos';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
